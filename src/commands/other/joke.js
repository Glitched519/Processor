const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
// const config = require("../../config.json");

module.exports = {
    data: {
        description: "Shows random joke",
        name: "joke",
        options: [
            {
                name: "dad",
                description: "Shows a dad joke",
                type: 1,
            },
            // {
            //     name: "norris",
            //     description: "Shows a Chuck Norris joke",
            //     type: 1,
            // }
        ]
    },
    async run(client, interaction) {
        const initTime = Date.now();
        const subCmd = interaction.options._subcommand;
        switch (subCmd) {
            case "dad":
                fetch("https://icanhazdadjoke.com/slack")
                    .then(res => res.json())
                    .then(json => {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(json.attachments[0].text)
                                    .setColor("DarkButNotBlack")
                                    .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` })
                            ]
                        });
                    })
                    .catch(() => {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Sorry, the API seems to be down. Please try again later.")
                                    .setColor("Red")
                                ], ephemeral: true
                        });
                    });
                break;
        }
    }
};