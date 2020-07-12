module.exports = {
    run: async(client, message, args) => {
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return client.users.cache.get(mention);
            }
        }        
        let avatarEmbed = {
            color: `RANDOM`,
            image: {
                url: message.author.displayAvatarURL()
            },
            timestamp: new Date()
        };
        if (args) {
            const user = getUserFromMention(args);
            if (!user) {
                return message.channel.send({embed: avatarEmbed})
            }
            let userAvatarEmbed = {
                color: `RANDOM`,
                image: {
                    url: user.displayAvatarURL()
                },
                timestamp: new Date()
            };
            return message.channel.send({embed: userAvatarEmbed});
        }
    }, 
    aliases: ['pic', 'pfp'],
    description: 'Shows the user profile pic'
}