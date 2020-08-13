const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if(message.content == `${PREFIX}poll`) return;
        let pollEmbed = {
            color: `RANDOM`,
            title: `${message.author.username} asks...`,
            description: args,
            timestamp: new Date()
        }
        message.delete();
        if (message.guild.id === '662734925707083778') {
            message.channel.send({embed: pollEmbed}).then(embedMessage => {
                const yesEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'yep');
                const noEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'nope');
                embedMessage.react(yesEmoji);
                embedMessage.react(noEmoji);
            });
        }
        else {
            message.channel.send({embed: pollEmbed}).then(embedMessage => {
                embedMessage.react('✅');
                embedMessage.react('❌');
            });
        }
    },
    aliases: [],
    description: 'Sends a poll with two options to react to'
}