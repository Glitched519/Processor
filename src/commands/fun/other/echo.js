const PREFIX = process.env.PREFIX;
const fs = require('fs')

module.exports = {
    run: async (client, message, args) => {

        message.delete();
        let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
        let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
        let msg = message.content.toLowerCase();
        let words = args.replace(/\s+/g, "_");

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return;
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return;
            }
        }

        if (args == `${PREFIX}echo`) return;
        if (args == `${PREFIX}say`) return;
        if (args.includes("@everyone")) return;
        message.channel.send(args);
    },
    aliases: ['say'],
    description: 'Makes the bot say something'
}