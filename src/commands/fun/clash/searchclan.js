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
                if (words.includes(bannedWords[i])) return;
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return;
            }
        }

        if (args.includes('clan')) return message.channel.send("You need to mention clan tag. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");

        if (args.includes('#')) {
            args = args.slice(1);
            if (args.length > 9 || args.length < 8) return message.channel.send("Invalid clan tag. Tag ID must be 8 or 9 characters in length. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");
            message.channel.send("https://www.clashofstats.com/clans/" + args.toUpperCase());
        }
        else {
            if (args.length > 8 || args.length < 7) return message.channel.send("Invalid clan tag. Tag ID must be 8 or 9 characters in length. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");
            message.channel.send("https://www.clashofstats.com/clans/" + args.toUpperCase());
        }
    },
    aliases: ['clan', 'findclan', 'clanfind'],
    description: 'Finds the clan stats via Clash of Stats'
}