const PREFIX = process.env.PREFIX;
const fs = require('fs');

module.exports = {
    run: async(client, message, args) => {

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

        if (args.startsWith(`${PREFIX}def`)) return;
        message.channel.send("https://www.vocabulary.com/dictionary/" + args);
    }, 
    aliases: ['def', 'define'],
    description: 'Shows the definition of a word'
}