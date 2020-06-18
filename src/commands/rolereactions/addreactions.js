const { MessageCollector } = require('discord.js');
const MessageModel = require('../../database/models/message')

let msgCollectionFilter = (newMsg, originalMsg) => {
    let { cache } = originalMsg.guild.emojis;
    if (newMsg.author.id !== originalMsg.author.id) return false;
    let [ emojiName, roleName ] = originalMsg.content.split(/,\s+/);
    if(!emojiName && !roleName) return false;
    let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
    if(!emoji) {
        originalMsg.channel.send("Emoji doesn't exist. Try again.")
            .then(msg => msg.delete({ timeout: 4000 }))
            .catch(err => console.log(err));
        return false;
    }
    let role = originalMsg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    if(!role) {
        originalMsg.channel.send("Role doesn't exist. Try again.")
            .then(msg => msg.delete({ timeout: 4000 }))
            .catch(err => console.log(err));
        return false;
    }
    return true;
}
module.exports = {
    run: async(client, message, args) => {  
        if(args.split(/\s+/).length !== 1) {
            let msg = await message.channel.send("Too many arguments. Must only provide 1 message ID.");   
            await msg.delete({ timeout: 3500 }).catch(err => console.log(err));   
        }
        else {
            try {
                let fetchedMessage = await message.channel.messages.fetch(args);
                if(fetchedMessage) {   
                    message.channel.send("Please provide all the emoji names with the role name, one by one, separated with a comma.\ne.g. arch, arch, where the emoji name comes first, role name comes second.");
                    let collector = new MessageCollector(message.channel,msgCollectionFilter.bind(null, message));
                    collector.on('collect', msg => {
                        let { cache } = msg.guild.emojis;              
                        let [ emojiName, roleName ] = msg.content.split(/,\s+/);
                        let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
                        let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                        if(emoji && role) {
                            fetchedMessage.react(emoji)
                                .then(emoji => console.log("Reacted!"))
                                .catch(err => console.log(err)); 
                        }
                    });        
                }
            }
            catch(err) {
                console.log(err);
                let msg = await message.channel.send(":x: Invalid ID. Message not found.");
                await msg.delete({ timeout: 3500 }).catch(err => console.log(err));
            }
        }
    },
    aliases: [],
    description: 'Enables a message to listen to reactions to give roles'
}