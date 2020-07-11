module.exports = {
    run: async(client, message, args) => {
        let roleMap = [];
        const roles = message.member.roles.cache;
        roles.forEach(role => {
            roleMap.push(role);
        });

        let infoEmbed = {
            title:  `Profile of ${message.author.username}` + `#` + `${message.author.discriminator}`,
            color: `RANDOM`,
            description:`ID: ${message.author.id}\nRoles: ${roleMap}\nCreated at: ${message.author.createdAt}`,
            thumbnail: {
                url: message.author.displayAvatarURL(),
            },
            timestamp: new Date()
        };
        message.channel.send({ embed: infoEmbed });
    },
    aliases: ['uinfo'],
    description: 'Loads the info of a specific user'
}