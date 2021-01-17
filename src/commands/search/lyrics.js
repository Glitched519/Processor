const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const { MessageEmbed } = require("discord.js");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Lyrics extends BaseCommand {
    constructor() {
        super('lyrics', 'search', ['lyric']);
    }

    async run(client, message, args) {
        let bannedWords = fs.readFileSync(path.join(__dirname, '../../events/bannedwords.txt')).toString().split("\r\n");
        let bannedPhrases = fs.readFileSync(path.join(__dirname, '../../events/bannedphrases.txt')).toString().split("\r\n");

        const options = {
            method: 'GET',
            url: `https://some-random-api.ml/lyrics?title=${args.join(' ')}`,
        };

        axios.request(options).then(response => {
            let res = response.data;
            // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
            if (!message.channel.nsfw) {
                for (let i = 0; i < bannedWords.length; i++) {
                    if (res.lyrics == bannedWords[i]) return message.channel.send(`${res.title} contains NSFW lyrics (${bannedWords[i]}). Please visit an NSFW channel to view this song's lyrics.`);
                }

                for (let j = 0; j < bannedPhrases.length; j++) {
                    if (res.lyrics.includes(bannedPhrases[j])) return message.channel.send(`${res.title} contains NSFW lyrics (${bannedPhrases[j]}). Please visit an NSFW channel to view this song's lyrics.`);
                }
            }
            let lyricsEmbed = new MessageEmbed()
                .setTitle(`${res.title} by ${res.author}`)
                .setColor(`RANDOM`)
                .setDescription(response.data.links.genius)

            return message.channel.send(lyricsEmbed);
        })
        // }).catch(err => {
        //     return message.channel.send(":x: The request song's lyrics could not be found.");
        // });

    }
}