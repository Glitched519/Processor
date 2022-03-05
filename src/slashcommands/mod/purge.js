const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "purge",
        "description": "Delete a certain amount of messages within 14 days",
        "options": [
            {
                "type": 4,
                "name": "amount",
                "description": "Amount of messages to delete",
                "required": true
            }
        ]
    },
    async run(client, interaction) {
        const amount = interaction.options.getInteger("amount");

        if (!interaction.memberPermissions.has("MANAGE_MESSAGES")) {
            return await interaction.reply({ content: "You need the `Manage Messages` permission to delete messages.", ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return await interaction.reply({ content: "I need the `Manage Messages` permission to delete messages." });
        }

        if (isNaN(amount) || parseInt(amount) <= 0 || parseInt(amount) > 100) {
            return await interaction.reply({ content: "You can only delete between 1 and 100 messages at once.", ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`I have cleared ${amount} message(s).`)
            ], ephemeral: true
        });
    }
};