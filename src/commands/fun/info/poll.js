const PREFIX = process.env.PREFIX;
const fs = require('fs');

module.exports = {
    run: async (client, message, args) => {
        if (message.content == PREFIX) return;
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        if (message.content == `${PREFIX}poll`) return;
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

        let pollEmbed = {
            color: `RANDOM`,
            title: `${message.author.username} asks...`,
            description: args,
            timestamp: new Date()
        }
        message.delete();
        if (message.guild.id === '662734925707083778') {
            message.channel.send({ embed: pollEmbed }).then(embedMessage => {
                const yesEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'yep');
                const noEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'nope');
                embedMessage.react(yesEmoji);
                embedMessage.react(noEmoji);
            });
        }
        else {
            message.channel.send({ embed: pollEmbed }).then(embedMessage => {
                embedMessage.react('✅');
                embedMessage.react('❌');
            });
        }
    },
    aliases: [],
    description: 'Sends a poll with two options to react to'
}