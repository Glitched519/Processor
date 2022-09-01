const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "kick",
        description: "Kick a user",
        options: [
            {
                type: 6,
                name: "user",
                description: "Selected user",
                required: true
            },
            {
                type: 3,
                name: "reason",
                description: "Reason for kick",
                required: true
            }
        ]
    },
    async run(client, interaction) {
        const initTime = Date.now();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!interaction.memberPermissions.has("KICK_MEMBERS")) {
            return await interaction.reply({ content: "You need the `Kick Members` permission to kick a member.", ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
            return await interaction.reply({ content: "I need the `Kick Members` permission to kick a member." });
        }

        await interaction.guild.members.kick(user.id, { reason: reason });

        let kickEmbed = new EmbedBuilder()
            .setDescription(`Kicked ${user} ${reason ? `for **${reason}**` : ""}`)
            .setColor("Red")
            .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` });
        await interaction.reply({ embeds: [kickEmbed] });
    }
};