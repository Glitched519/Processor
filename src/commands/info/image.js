const fs = require('fs');
const path = require('path');
const axios = require("axios").default;
const config = require('../../config.json');
const BaseCommand = require('../../utils/structures/BaseCommand');



module.exports = class GoogleImage extends BaseCommand {
    constructor() {
        super('image', 'info', ['img']);
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

        let size = 10;

        const options = {
          method: 'GET',
          url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
          params: {q: args.join(' '), pageSize: size, autoCorrect: 'true'},
          headers: {
            'x-rapidapi-key': config['x-rapid-api-key'],
            'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            let randomIndex = Math.floor(Math.random() * size);
            let image = response.data.value[randomIndex].url;
            message.channel.send(image);
        }).catch(function (error) {
            console.error(error);
        });
    }
}