const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "ban",
        "description": "Ban a user",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "Selected user",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "Reason for ban",
                "required": true
            }
        ]
    },
    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!interaction.memberPermissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "You need the `Ban Members` permission to ban a member.", ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "I need the `Ban Members` permission to ban a member." });
        }

        await interaction.guild.members.ban(user.id, { reason: reason });

        let banEmbed = new MessageEmbed()
            .setDescription(`Banned ${user} ${reason ? `for **${reason}**` : ""}`)
            .setColor("DARK_RED");
        await interaction.reply({ embeds: [banEmbed] });
    }
};