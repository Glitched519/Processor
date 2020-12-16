module.exports = {
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args);
        if (member) {
            let userAvatarEmbed = {
                color: `RANDOM`,
                image: {
                    url: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.gif`
                },
            };
            return message.channel.send({ embed: userAvatarEmbed });
        }
        else {
            let avatarEmbed = {
                color: `RANDOM`,
                image: {
                    url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.gif`
                },
            };
            return message.channel.send({ embed: avatarEmbed });
        }
    },
    aliases: ['pic', 'pfp', 'av'],
    description: 'Shows the user profile pic'
}