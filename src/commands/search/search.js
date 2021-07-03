const fs = require('fs')
const path = require('path')
const request = require("node-superfetch")
const config = require('../../config.json')
const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js')



module.exports = class Search extends BaseCommand {
    constructor() {
        super('search', 'search', [])
    }

    async run(client, message, args) {
        let googleKey = config['google-search-api-key']
        let csx = 'a81fbd269d9776933' // Search engine ID
        let query = args.join(" ")

        let bannedWords = fs.readFileSync(path.join(__dirname, '../../events/bannedwords.txt')).toString().split("\r\n")
        let bannedPhrases = fs.readFileSync(path.join(__dirname, '../../events/bannedphrases.txt')).toString().split("\r\n")
        let msg = message.content.toLowerCase()
        let wordsOnlyMsg = msg.replace(/[.?!#$%^&*,-_+=]/g, ' ')
        let words = wordsOnlyMsg.split(/\s+/)

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return
            }
        }

        const errorEmbed = new MessageEmbed()
            .setDescription(`Could not find search results for **${query}**.`)
            .setColor('RED')

        if (!query) return message.channel.send({ content: "Please enter a search query." })

        let href = await search(query)
        if (!href) return message.channel.send({ embeds: [errorEmbed] })

        const searchEmbed = new MessageEmbed()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null) // Sometimes, the thumbnail might be unavailable in variant site. Return it to null.
            .setURL(href.link)
            .setColor(`RANDOM`)
            .setFooter("Powered by Google", "https://www.freepngimg.com/thumb/google/67060-play-photos-search-google-account-png-file-hd.png")

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey,
                cx: csx,
                safe: 'off',
                q: query
            })
            if (!body || !body.items) {
                return message.channel.send({ embeds: [errorEmbed] })
            } else {
                return body.items[Math.floor(Math.random() * 10)]
            }
        }
        if (href.title !== undefined) {
            return message.channel.send({ embeds: [searchEmbed] })
        }
    }
}