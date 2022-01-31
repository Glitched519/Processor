const { inspect } = require("util") ;
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "eval",
        "description": "Evaluate an expression (owner only)",
        "options": [
            {
                "type": 3,
                "name": "input",
                "description": "Pass input into Node",
                "required": true
            },
        ]
    },
    async run(client, interaction) {
        const input = interaction.options.getString("input");
        if (interaction.user.id !== "749985510889619576") return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Not Allowed")
                    .setColor("YELLOW")
                    .setDescription("Only the owner can run this command.")
            ], ephemeral: true
        });
        try {
            const evaled = eval(input);

            let evalEmbed = new MessageEmbed()
                .setTitle("Evaluated")
                .setColor("GREEN")
                .setDescription(`\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
                .setTimestamp();

            interaction.reply({ embeds: [evalEmbed], ephemeral: true });
        }
        catch (err) {
            let errEmbed = new MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setDescription(`\`\`\`js\n${err}\`\`\``)
                .setTimestamp();

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
};