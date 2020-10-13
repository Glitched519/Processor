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

        if (args.includes('#')) {
            args = args.slice(1);
        }
        message.channel.send("https://www.clashofstats.com/clans/" + args);
        
    }, 
    aliases: ['clan', 'findclan', 'clanfind'],
    description: 'Finds the clan stats via Clash of Stats'
}