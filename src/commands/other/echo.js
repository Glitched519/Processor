const fs = require('fs')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Echo extends BaseCommand {
    constructor() {
        super('echo', 'other', ['say']);
    }

    run(client, message, args) {
        if (!args[0]) return;
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
        let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
        let msg = message.content.toLowerCase();
        let words = args.join("_");

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return;
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return;
            }
        }

        if (args.includes("@everyone")) return;
        if (args.includes("@here")) return;
        message.channel.send(args);
    }
}