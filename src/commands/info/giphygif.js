const config = require('../../config.json');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class GiphyGif extends BaseCommand {
    constructor() {
        super('giphygif', 'info', ['gif', 'giphy']);
    }

    run(client, message, args) {
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

        let randomIndex = Math.floor(Math.random() * 20);
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${config['giphy-token']}&limit=20&q=${args.join('%20')}`
        fetch(url)
            .then(res => res.json())
            .then(json => {
                message.channel.send(json.data[randomIndex].images.original.url);
            });
    }
}