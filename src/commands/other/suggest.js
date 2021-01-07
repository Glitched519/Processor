const fs = require('fs');
const path = require('path');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Suggest extends BaseCommand {
    constructor() {
        super('suggest', 'other', []);
    }

    run(client, message, args) {
        if (args.length == 0) return;
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
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
        let suggestEmbed = {
            color: `RANDOM`,
            title: `${message.author.username} suggests...`,
            description: args.join(' '),
            timestamp: new Date()
        }
        message.channel.send({ embed: suggestEmbed }).then(embedMessage => {
            embedMessage.react('✅');
            embedMessage.react('❌');
        });
    }
}