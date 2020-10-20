module.exports = {
    run: async (client, message, args) => {
        let authorEmbed = {
            color: `RANDOM`,
            title: `Hi, I'm ${client.user.tag}`,
            description: 'I am currently being developed by <@!638064155965915187> :blue_heart:',
            thumbnail: {
                url: client.user.displayAvatarURL(),
            },
            timestamp: new Date()
        };
        message.channel.send({ embed: authorEmbed });

    },
    aliases: ['creator', 'dev', 'developer'],
    description: 'Shows the creator of this awesome bot'
}