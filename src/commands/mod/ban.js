const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: {
        name: "ban",
        description: "Ban a user",
        options: [
            {
                type: 6,
                name: "user",
                description: "Selected user",
                required: true,
            },
            {
                type: 3,
                name: "reason",
                description: "Reason for ban",
                required: true
            }
        ]
    },
    async run(client, interaction) {
        const initTime = Date.now();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
// 
        console.log(interaction.member.permissions.has("BAN_MEMBERS"));
        const me = interaction.guild.members.cache.get(client.user.id);
        console.log(me.permissions.has);

        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "You need the `Ban Members` permission to ban a member.", ephemeral: true });
        }

        // if (!me.permissions.has("BAN_MEMBERS")) {
        //     return await interaction.reply({ content: "I need the `Ban Members` permission to ban a member." });
        // }

        if (me.roles.highest.rawPosition <= interaction.member.roles.highest.rawPosition) {
            return await interaction.reply({ content: "Cannot ban. The member you are trying to ban has a role, whose rank is higher than mine.", ephemeral: true  });
        }

        await interaction.guild.members.ban(user.id, { reason: reason });

        let banEmbed = new EmbedBuilder()
            .setDescription(`Banned ${user} ${reason ? `for **${reason}**` : ""}`)
            .setColor("DarkRed")
            .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` });
        await interaction.reply({ embeds: [banEmbed] });
    }
};