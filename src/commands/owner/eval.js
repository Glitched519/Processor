const { inspect } = require("util");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const input = interaction.options.getString("input");
        try {
            const evaled = eval(input);

            let evalEmbed = new EmbedBuilder()
                .setTitle("Evaluated")
                .setColor("Green")
                .setDescription(`\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
                .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` });

            await interaction.reply({ embeds: [evalEmbed], ephemeral: true });
        }
        catch (err) {
            let errEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setColor("Red")
                .setDescription(`\`\`\`js\n${err}\`\`\``);

            await interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    },
    devOnly: true,
    testOnly: true,
    name: "eval",
    description: "Evaluate an expression (owner only)",
    options: [
        {
            type: 3,
            name: "input",
            description: "Pass input into Node",
            required: true
        },
    ]
}