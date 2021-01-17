const fs = require('fs');
const path = require('path');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SearchPlayer extends BaseCommand {
    constructor() {
        super('searchplayer', 'clash', ['player', 'findplayer', 'playerfind']);
    }

    async run(client, message, args) {
        let bannedWords = fs.readFileSync(path.join(__dirname, '../../events/bannedwords.txt')).toString().split("\r\n");
        let bannedPhrases = fs.readFileSync(path.join(__dirname, '../../events/bannedphrases.txt')).toString().split("\r\n");
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

        if (!args[0]) return message.channel.send("You need to mention player tag. Ex: `#RRY9Q2V` or `#280LYG8G9`.");

        if (args[0].includes('#')) {
            args[0] = args[0].slice(1);
            if (args[0].length > 9 || args[0].length < 7) return message.channel.send("Invalid player tag. Tag ID must be 7 or 8 characters in length. Ex: `#RRY9Q2V` or `#280LYG8G9`.");
            message.channel.send("https://www.clashofstats.com/players/" + args[0].toUpperCase());
        }
        else {
            if (args[0].length > 8 || args[0].length < 6) return message.channel.send("Invalid player tag. Tag ID must be 7 or 8 characters in length. Ex: `#RRY9Q2V` or `#280LYG8G9`.");
            message.channel.send("https://www.clashofstats.com/players/" + args[0].toUpperCase());
        }
    }
}