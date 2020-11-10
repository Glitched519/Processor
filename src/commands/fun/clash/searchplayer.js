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


        if (args.includes('#')) {
            args = args.slice(1);
            if (args.length > 8 || args.length < 7) return message.channel.send("Invalid player tag. Tag ID must be 7 or 8 characters in length. Ex: `#RRY9Q2V` or `#280LYG8G9`.");
            message.channel.send("https://www.clashofstats.com/players/" + args.toUpperCase());
        }
        else {

        }

    },
    aliases: ['player', 'findplayer', 'playerfind'],
    description: 'Finds the player stats via Clash of Stats'
}