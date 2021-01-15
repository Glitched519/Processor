const used = new Map();
const Duration = require('humanize-duration');

const fs = require('fs')
const path = require('path');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Echo extends BaseCommand {
    constructor() {
        super('echo', 'other', ['say']);
    }

    run(client, message, args) {
        const timeInSeconds = 30;
        const cooldown = used.get(message.author.id);
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        if (!args[0]) return;
        let bannedWords = fs.readFileSync(path.join(__dirname, '../../events/bannedwords.txt')).toString().split("\r\n");
        let bannedPhrases = fs.readFileSync(path.join(__dirname, '../../events/bannedphrases.txt')).toString().split("\r\n");
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
        if (cooldown) {
            const remaining = Duration(cooldown - Date.now(), { units: ['s'], round: 1 });
            return message.reply(`you need to wait ${remaining} before using this command.`).catch((err) => message.reply(err));
        }
        else {
            used.set(message.author.id, Date.now() + 1000 * timeInSeconds);
            setTimeout(() => used.delete(message.author.id), 1000 * timeInSeconds);
            message.channel.send(args.join(' '));
        }

    }
}