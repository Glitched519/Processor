const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.other.meme().then(res => {
            let memeEmbed = {
                title: res.caption,
                color: `RANDOM`,
                image: {
                    url: res.image
                },
                timestamp: new Date()
            }
            return message.channel.send({embed: memeEmbed});
        });
    }, 
    aliases: ['haha', 'funny', 'lol'],
    description: 'Shows a random meme'
}