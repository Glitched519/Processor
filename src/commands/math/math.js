const { create, all } = require("mathjs");
const math = create(all);
const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const subCmd = interaction.options._subcommand;
        const expression = interaction.options.getString("expression");
        const base = interaction.options.getInteger("base");
        const number = interaction.options.getString("number");

        switch (subCmd) {
            case "calculate":
                try {
                    let ans = math.evaluate(expression);
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("Calculated")
                                .setDescription("`" + math.format(ans, { precision: 16 }) + "`")
                                .setColor("Green")
                                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                        ]
                    });
                }
                catch (err) {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("Errored")
                                .setDescription(`\`\`\`js\n${err}\`\`\``)
                                .setColor("Red")
                                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                        ]
                    });
                }
                break;
            case "convert":
                if (base != 64) {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("`" + Number(number).toString(base).toUpperCase() + "`")
                                .setColor("DarkButNotBlack")
                                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                        ]
                    });
                } else {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("`" + btoa(number).toUpperCase() + "`")
                                .setColor("DarkButNotBlack")
                                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                        ]
                    });
                }
                break;
        }
    },
    name: "math",
    description: "calculate",
    options: [
        {
            type: 1,
            name: "calculate",
            description: "Calculate a math expression",
            options: [
                {
                    type: 3,
                    name: "expression",
                    description: "Expression to parse",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "convert",
            description: "Convert a regular number into an n-based number",
            options: [
                {
                    type: 4,
                    name: "base",
                    description: "N-base",
                    choices: [
                        {
                            name: "2",
                            value: 2
                        },
                        {
                            name: "16",
                            value: 16
                        },
                        {
                            name: "32",
                            value: 32
                        },
                        {
                            name: "64",
                            value: 64
                        }
                    ],
                    required: true
                },
                {
                    type: 3,
                    name: "number",
                    description: "Number to convert",
                    required: true
                }
            ]
        }
    ]
}