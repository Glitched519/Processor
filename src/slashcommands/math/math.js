const { create, all } = require("mathjs");
const math = create(all);
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "math",
        "description": "calculate",
        "options": [
            {
                "type": 1,
                "name": "calculate",
                "description": "Calculate a math expression",
                "options": [
                    {
                        "type": 3,
                        "name": "expression",
                        "description": "Expression to parse",
                        "required": true
                    }
                ]
            },
            {
                "type": 1,
                "name": "convert",
                "description": "Convert a regular number into an n-based number",
                "options": [
                    {
                        "type": 4,
                        "name": "base",
                        "description": "N-base",
                        "choices": [
                            {
                                "name": "2",
                                "value": 2
                            },
                            {
                                "name": "16",
                                "value": 16
                            },
                            {
                                "name": "32",
                                "value": 32
                            },
                            {
                                "name": "64",
                                "value": 64
                            }
                        ],
                        "required": true
                    },
                    {
                        "type": 3,
                        "name": "number",
                        "description": "Number to convert",
                        "required": true
                    }
                ]
            }
        ]
    },
    async run(client, interaction) {
        const subCmd = interaction.options._subcommand;
        const expression = interaction.options.getString("expression");
        const base = interaction.options.getInteger("base");
        const number = interaction.options.getString("number");

        switch (subCmd) {
            case "calculate":
                try {
                    let ans = math.evaluate(expression);
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Calculated")
                                .setDescription("`" + math.format(ans, { precision: 16 }) + "`")
                                .setColor("GREEN")
                        ]
                    });
                }
                catch (err) {
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Errored")
                                .setDescription(`\`\`\`js\n${err}\`\`\``)
                                .setColor("RED")
                        ]
                    });
                }
                break;
            case "convert":
                if (base != 64) {
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setDescription("`" + Number(number).toString(base).toUpperCase() + "`")
                                .setColor("RANDOM")
                        ]
                    });
                } else {
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setDescription("`" + btoa(number).toUpperCase() + "`")
                                .setColor("RANDOM")
                        ]
                    });
                }
                break;
        }
    }
};