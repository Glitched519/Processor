const axios = require("axios").default
const { MessageEmbed } = require("discord.js")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Pokemon extends BaseCommand {
    constructor() {
        super("pokemon", "info", ["poke"])
    }

    async run(client, message, args) {
        const options = {
            method: "GET",
            url: `https://some-random-api.ml/pokedex?pokemon=${args.join(" ")}`,
        }

        axios.request(options).then(response => {
            let res = response.data
            let pokemonEmbed = new MessageEmbed()
                .setTitle(`${res.name} (${res.id})`)
                .setDescription(res.description)
                .setColor(`RANDOM`)
                .setThumbnail(res.sprites.animated)
                .addField("HP", res.stats.hp, true)
                .addField("Attack", res.stats.attack, true)
                .addField("Defense", res.stats.defense, true)
                .addField("Special Attack", res.stats.sp_atk, true)
                .addField("Special Defense", res.stats.sp_def, true)
                .addField("Speed", res.stats.speed, true)

            message.reply({ embeds: [pokemonEmbed] })
        }).catch(() => {
            return message.reply({ content: ":x: That is an invalid pokemon." })
        })
    }
}