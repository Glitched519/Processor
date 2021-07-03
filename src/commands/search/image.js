const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const path = require('path')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Image extends BaseCommand {
    constructor() {
        super('image', 'info', ['img'])
    }

    run(client, message, args) {
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
        

        function image(message) {
            let options = {
                url: "https://results.dogpile.com/serp?qc=images&q=" + args.join('%20'),
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            }

            request(options, function (error, response, responseBody) {
                if (error) return message.channel.send({ content: ":x: **Error finding image.**" })

                let $ = cheerio.load(responseBody)
                let links = $(".image a.link")
                console.log($.html())
                let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
                if (!urls.length) return
                message.channel.send({ content: urls[Math.floor(Math.random() * urls.length)] })
            })

        }

        

        image(message)
    }
}