const fs = require("fs")
const path = require("path")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Wikipedia extends BaseCommand {
    constructor() {
        super("wikipedia", "search", ["wiki"])
    }

    async run(client, message, args) {
        if (args.length == 0) return
        let bannedWords = fs.readFileSync(path.join(__dirname, "../../events/bannedwords.txt")).toString().split("\r\n")
        let bannedPhrases = fs.readFileSync(path.join(__dirname, "../../events/bannedphrases.txt")).toString().split("\r\n")
        let msg = message.content.toLowerCase()
        let words = args.join("_")

        // Checks if parameter is an nsfw term. Blocks command in non-nsfw channels.
        if (!message.channel.nsfw) {
            for (let i = 0; i < bannedWords.length; i++) {
                if (words.includes(bannedWords[i])) return
            }

            for (let j = 0; j < bannedPhrases.length; j++) {
                if (msg.includes(bannedPhrases[j])) return
            }
        }

        message.reply({ content: "https://www.wikiwand.com/en/" + words })
    }
}