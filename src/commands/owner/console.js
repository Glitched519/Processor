const { exec } = require("child_process");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "console",
        description: "Interact with the console (owner only)",
        options: [
            {
                type: 3,
                name: "input",
                description: "Pass input into PowerShell",
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

        exec(input, { "shell": "pwsh.exe" }, (error, stdout, stderr) => {
            if (error) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Error")
                            .setColor("Red")
                            .setDescription(`\`\`\`powershell\n${error.message}\n\`\`\``)
                            .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` })
                    ], ephemeral: true
                });
            }
            if (stderr) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Fatal Error")
                            .setColor("DarkRed")
                            .setDescription(`\`\`\`powershell\n${stderr}\n\`\`\``)
                            .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` })
                    ], ephemeral: true
                });
            }
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Output")
                        .setColor("DarkRed")
                        .setDescription(`\`\`\`powershell\n${stdout}\n\`\`\``)
                        .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` })
                ], ephemeral: true
            });
        });
    }
};