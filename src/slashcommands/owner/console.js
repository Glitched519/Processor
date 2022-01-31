const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "console",
        "description": "Interact with the console (owner only)",
        "options": [
            {
                "type": 3,
                "name": "input",
                "description": "Pass input into PowerShell",
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

        exec(input, { "shell": "pwsh.exe" }, (error, stdout, stderr) => {
            if (error) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Error")
                            .setColor("RED")
                            .setDescription(`\`\`\`powershell\n${error.message}\n\`\`\``)
                            .setTimestamp()
                    ], ephemeral: true
                });
            }
            if (stderr) {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("Fatal Error")
                            .setColor("DARK_RED")
                            .setDescription(`\`\`\`powershell\n${stderr}\n\`\`\``)
                            .setTimestamp()
                    ], ephemeral: true
                });
            }
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Output")
                        .setColor("DARK_RED")
                        .setDescription(`\`\`\`powershell\n${stdout}\n\`\`\``)
                        .setTimestamp()
                ], ephemeral: true
            });
        });
    }
};