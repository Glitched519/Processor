const axios = require("axios").default;
const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const pokemon = interaction.options.getString("pokemon");
        const options = {
            method: "GET",
            url: `https://some-random-api.com/pokemon/pokedex?pokemon=${pokemon}`,
        };

        await axios.request(options).then(response => {
            let res = response.data;
            let pokemonEmbed = new EmbedBuilder()
                .setTitle(`${res.name} (${res.id})`)
                .setDescription(res.description)
                .setColor("DarkButNotBlack")
                .setThumbnail(res.sprites.animated)
                .addFields([
                    { name: "HP", value: res.stats.hp, inline: true },
                    { name: "Attack", value: res.stats.attack, inline: true },
                    { name: "Defense", value: res.stats.defense, inline: true },
                    { name: "Special Attack", value: res.stats.sp_atk, inline: true },
                    { name: "Special Defense", value: res.stats.sp_def, inline: true },
                    { name: "Speed", value: res.stats.speed, inline: true },
                ])
                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` });


            return interaction.reply({ embeds: [pokemonEmbed] });
        }).catch(() => {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setDescription("Pokemon not found.")
                ], ephemeral: true
            });
        });
    },
    name: "pokemon",
    description: "Shows the stats of a pokemon.",
    options: [
        {
            type: 3,
            name: "pokemon",
            description: "Pokemon to look up.",
            required: true
        }
    ]
}