const fs = require('fs');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Wikipedia extends BaseCommand {
  constructor() {
    super('wikipedia', 'other', ['wiki']);
  }

  run(client, message, args) {
    if (args.length == 0) return;
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

        message.channel.send("https://en.wikipedia.org/wiki/" + words);
  }
}