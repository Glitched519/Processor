const fs = require('fs');

module.exports = {
    run: async (client, message, args) => {

        let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
        let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
        let msg = message.content.toLowerCase();
        let words = args.replace(/\s+/g, "_");

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return message.delete();
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return message.delete();
            }
        }

        message.channel.send("https://en.wikipedia.org/wiki/" + words);
    },
    aliases: ['wiki'],
    description: 'Loads a Wikipedia page of the given topic'
}