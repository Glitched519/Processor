const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "help",
        description: "Shows the help menu.",
    },
    async run(client, interaction) {
        const initTime = Date.now();
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Here's some help")
                    .setDescription("**[Commands](https://processorbot.xyz/commands/)**")
                    .setColor("Gold")
                    .setFooter({ text: `processorbot.xyz | ⏱️ ${Date.now() - initTime} ms` })
            ], ephemeral: true
        });
    }
};