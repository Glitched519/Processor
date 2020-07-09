module.exports = {
    run: async(client, message, args) => {
        let roleMap = [];
        const roles = message.member.roles.cache;
        console.log(message.author);
        roles.forEach(role => {
            roleMap.push(role);
        });

        let infoEmbed = {
            title: `Info for ${message.author.username}` + `#` + `${message.author.discriminator}`,
            description: `Roles: ${roleMap}`,
            thumbnail: {
                url: client.user.displayAvatarURL(),
            },
        };
        message.channel.send({ embed: infoEmbed });
    },
    aliases: ['uinfo'],
    description: 'Loads the info of a specific user'
}