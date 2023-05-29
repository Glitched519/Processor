const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const subCmd = interaction.options._subcommand;
        const user = interaction.options.getUser("user");

        fetch(`https://some-random-api.ml/animu/${subCmd}`)
            .then(res => res.json())
            .then(json => {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`**<@!${interaction.user.id}> ${subCmd}s ${subCmd === "wink" ? "at " : ""}${user}! Wholesome 💙**`)
                            .setImage(json.link)
                            .setColor("Yellow")
                            .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                    ]
                });
            });
    },
    name: "cute",
    description: "Shows a cute anime picture",
    options: [
        {
            type: 1,
            name: "hug",
            description: "Hug someone",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "User to mention",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "pat",
            description: "Pat someone",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "User to mention",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "wink",
            description: "Wink at someone",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "User to mention",
                    required: true
                }
            ]
        }
    ]
}