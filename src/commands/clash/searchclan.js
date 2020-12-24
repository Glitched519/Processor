const fs = require('fs');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SearchClan extends BaseCommand {
  constructor() {
    super('searchclan', 'clash', ['clan', 'findclan', 'clanfind']);
  }

  run(client, message, args) {
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

    if (!args[0]) return message.channel.send("You need to mention clan tag. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");

    if (args[0].includes('#')) {
      args[0] = args[0].slice(1);
      if (args[0].length > 9 || args[0].length < 8) return message.channel.send("Invalid clan tag. Tag ID must be 8 or 9 characters in length. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");
      message.channel.send("https://www.clashofstats.com/clans/" + args[0].toUpperCase());
    }
    else {
      if (args[0].length > 8 || args[0].length < 7) return message.channel.send("Invalid clan tag. Tag ID must be 8 or 9 characters in length. Ex: `#LGG2JY8G` or `#2Y8CVJRV0`.");
      message.channel.send("https://www.clashofstats.com/clans/" + args[0].toUpperCase());
    }
  }
}