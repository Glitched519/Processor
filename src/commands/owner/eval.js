const { inspect } = require("util") ;
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
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
    },
    async run(client, interaction) {
        const initTime = Date.now();
        const input = interaction.options.getString("input");
        if (interaction.user.id !== "749985510889619576") return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Not Allowed")
                    .setColor("Yellow")
                    .setDescription("Only the owner can run this command.")
            ], ephemeral: true
        });
        try {
            const evaled = eval(input);

            let evalEmbed = new EmbedBuilder()
                .setTitle("Evaluated")
                .setColor("Green")
                .setDescription(`\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
                .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` });

            await interaction.reply({ embeds: [evalEmbed], ephemeral: true });
        }
        catch (err) {
            let errEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setColor("Red")
                .setDescription(`\`\`\`js\n${err}\`\`\``);

            await interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
};