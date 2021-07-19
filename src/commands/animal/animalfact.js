const axios = require("axios").default
const { MessageEmbed } = require("discord.js")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class AnimalFact extends BaseCommand {
    constructor() {
        super("animalfact", "animal", ["fact"])
    }

    async run(client, message, args) {

        if (!args[0]) return

        const options = {
            method: "GET",
            url: `https://some-random-api.ml/facts/${args.join(" ")}`,
        }

        axios.request(options).then(response => {
            let factEmbed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setDescription(response.data.fact)
            return message.reply({ embeds: [factEmbed] })
        }).catch(() => {
            return message.reply({ content: ":x: Sorry, we don't have any facts for that animal." })
        })
    }
}