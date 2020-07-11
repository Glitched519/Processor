module.exports = {
    run: async(client, message, args) => {
        let authorEmbed = {
            color: `RANDOM`,
            title: 'Hi, I\'m Processor',
            description: 'I am currently being developed by Processing#0506 :blue_heart:',
            thumbnail: {
                url: client.user.displayAvatarURL(),
            },
            image: {
                url: 'https://i.imgur.com/wSTFkRM.png'
            },
            timestamp: new Date()
        };
        message.channel.send({ embed: authorEmbed });
        
    }, 
    aliases: ['creator', 'dev', 'developer'],
    description: 'Shows the creator of this awesome bot'
}