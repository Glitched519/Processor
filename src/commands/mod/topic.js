const PREFIX = process.env.PREFIX;
const fs = require('fs');

module.exports = {
    run: async (client, message, args) => {
        message.delete()
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(":x: **You need the `Manage Channels` permission change the topic of this channel.**");

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

        if (args == `${PREFIX}topic`) return;
        message.channel.setTopic(args);
    },
    aliases: [],
    description: 'Sets the topic for a channel'
}
