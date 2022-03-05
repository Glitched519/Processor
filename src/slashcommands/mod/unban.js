const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "unban",
        "description": "Unban a user via user ID",
        "options": [
            {
                "type": 3,
                "name": "user",
                "description": "User ID",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "Reason for unban",
                "required": true
            }
        ]
    },
    async run(client, interaction) {
        const user = interaction.options.getString("user");
        const reason = interaction.options.getString("reason");

        if (!interaction.memberPermissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "You need the `Ban Members` permission to unban a member.", ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "I need the `Ban Members` permission to unban a member." });
        }

        await interaction.guild.members.unban(user, { reason: reason });

        let unbanEmbed = new MessageEmbed()
            .setDescription(`Unbanned ${user} ${reason ? `for **${reason}**` : ""}`)
            .setColor("DARK_GREEN");
        await interaction.reply({ embeds: [unbanEmbed] });
    }
};