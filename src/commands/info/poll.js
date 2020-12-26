const config = require('../../config.json');
const PREFIX = config['bot-prefix'];
const fs = require('fs');
const emojis = require('../../emojis.json');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Poll extends BaseCommand {
    constructor() {
        super('poll', 'info', []);
    }

    async run(client, message, args) {
        // if (args.length == 0) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(":x: You must have `Manage Messages` permission to run this command.")
        }
        // let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
        // let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
        // let msg = message.content.toLowerCase();
        // let wordsOnlyMsg = msg.replace(/[.?!#$%^&*,-_+=]/g, ' ');
        // let words = wordsOnlyMsg.split(/\s+/);

        // // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        // if (!message.channel.nsfw) {
        //   for (let i = 0; i < bannedWords.length; i++) {
        //     if (words.includes(bannedWords[i])) return;
        //   }

        //   for (let j = 0; j < bannedPhrases.length; j++) {
        //     if (msg.includes(bannedPhrases[j])) return;
        //   }
        // }

        // let pollEmbed = {
        //   color: `RANDOM`,
        //   title: `${message.author.username} asks...`,
        //   description: args.join(' '),
        //   timestamp: new Date()
        // }
        // message.channel.send({ embed: pollEmbed }).then(embedMessage => {
        //   embedMessage.react(emojis.yes);
        //   embedMessage.react(emojis.no);
        // });
        const addReactions = message => {
            message.react('👍')
            setTimeout(() => {
                message.react('👎');
            }, 500)
        }

        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) await message.delete();
        const fetched = await message.channel.messages.fetch({ limit: 1 })
        if (fetched && fetched.first()) {
            addReactions(fetched.first())
        }
    }
}