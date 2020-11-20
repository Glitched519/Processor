module.exports = {
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args);
        if (member) {
            let userAvatarEmbed = {
                color: `RANDOM`,
                image: {
                    url: member.user.displayAvatarURL()
                },
                timestamp: new Date()
            };
            return message.channel.send({ embed: userAvatarEmbed });
        }
        else {
            let avatarEmbed = {
                color: `RANDOM`,
                image: {
                    url: message.author.displayAvatarURL()
                },
                timestamp: new Date()
            };
            return message.channel.send({ embed: avatarEmbed });
        }
    },
    aliases: ['pic', 'pfp', 'av'],
    description: 'Shows the user profile pic'
}