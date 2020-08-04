const token = process.env.GIPHY_TOKEN;
const fetch = require('node-fetch');

module.exports = {
    run: async(client, message, args) => {
        let randomIndex = Math.floor(Math.random() * 10);
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${token}&limit=10&q=${args}`
        fetch(url)
        .then(res => res.json())
        .then(json => {
            let gifEmbed = {
                image: {
                    url: json.data[randomIndex].images.original.url
                },
                timestamp: new Date()
            }
            message.channel.send({embed: gifEmbed});
        });
    },
    aliases: ['gif', 'giphy'],
    description: 'Shows a random GIF with given search item'
}