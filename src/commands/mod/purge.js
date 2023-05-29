const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const emojis = require("../../emojis.json");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const amount = interaction.options.getInteger("amount");

        if (isNaN(amount) || parseInt(amount) <= 0 || parseInt(amount) > 100) {
            return await interaction.reply({ content: "You can only delete between 1 and 100 messages at once.", ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`I have cleared ${amount} message(s).`)
                    .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
            ], ephemeral: true
        });
    },
    name: "purge",
    description: "Delete a certain amount of messages within 14 days",
    options: [
        {
            type: 4,
            name: "amount",
            description: "Amount of messages to delete",
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
}