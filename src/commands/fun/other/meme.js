const fetch = require('node-fetch');

module.exports = {
    run: async(client, message, args) => {
        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {
            let memeEmbed = {
                title: json.title,
                color: `RANDOM`,
                image: {
                    url: json.url
                },
                timestamp: new Date()
            }
            return message.channel.send({embed: memeEmbed});
        });
    }, 
    aliases: ['haha', 'funny', 'lol'],
    description: 'Shows a random meme'
}