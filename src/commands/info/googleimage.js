const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class GoogleImage extends BaseCommand {
  constructor() {
    super('googleimage', 'info', ['image', 'img']);
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

    function image(message) {
      let options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + args.join('%20'),
        method: "GET",
        headers: {
          "Accept": "text/html",
          "User-Agent": "Chrome"
        }
      }

      request(options, function (error, response, responseBody) {
        if (error) return message.channel.send(":x: **Error finding image.**");

        let $ = cheerio.load(responseBody);
        let links = $(".image a.link");
        let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) return;

        // Send result
        let imgEmbed = {
          image: {
            url: urls[Math.floor(Math.random() * urls.length)]
          },
          timestamp: new Date()
        }
        message.channel.send({ embed: imgEmbed });
      });

    }

    image(message);
  }
}