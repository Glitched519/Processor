const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "pokemon",
        "description": "Shows the stats of a pokemon.",
        "options": [
            {
                "type": 3,
                "name": "pokemon",
                "description": "Pokemon to look up.",
                "required": true
            }
        ]
    },
    async run(client, interaction) {
        const pokemon = interaction.options.getString("pokemon");
        const options = {
            method: "GET",
            url: `https://some-random-api.ml/pokedex?pokemon=${pokemon}`,
        };

        await axios.request(options).then(response => {
            let res = response.data;
            let pokemonEmbed = new MessageEmbed()
                .setTitle(`${res.name} (${res.id})`)
                .setDescription(res.description)
                .setColor("RANDOM")
                .setThumbnail(res.sprites.animated)
                .addField("HP", res.stats.hp, true)
                .addField("Attack", res.stats.attack, true)
                .addField("Defense", res.stats.defense, true)
                .addField("Special Attack", res.stats.sp_atk, true)
                .addField("Special Defense", res.stats.sp_def, true)
                .addField("Speed", res.stats.speed, true);

            return interaction.reply({ embeds: [pokemonEmbed] });
        }).catch(() => {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("Pokemon not found.")
                ], ephemeral: true
            });
        });
    }
};