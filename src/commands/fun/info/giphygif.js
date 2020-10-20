const token = process.env.GIPHY_TOKEN;
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    run: async (client, message, args) => {

        let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
        let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
        let msg = message.content.toLowerCase();
        let wordsOnlyMsg = msg.replace(/[.?!#$%^&*,-_+=]/g, ' ');
        let words = wordsOnlyMsg.split(/\s+/);

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return message.delete();
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return message.delete();
            }
        }

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
                message.channel.send({ embed: gifEmbed });
            });
    },
    aliases: ['gif', 'giphy'],
    description: 'Shows a random GIF with given search item'
}