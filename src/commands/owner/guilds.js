const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    data: {
        name: "guilds",
        description: "View guilds (owner only)",
    },
    async run(client, interaction) {
        if (interaction.user.id !== "749985510889619576") return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Not Allowed")
                    .setColor("Yellow")
                    .setDescription("Only the owner can run this command.")
            ], ephemeral: true
        });
        const guildEmbed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setTitle(`${client.guilds.cache.size} Servers`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
            .setTimestamp();
        client.guilds.cache.forEach(guild => {
            guildEmbed.addFields([{ name: `${guild.name}`, value: `${guild.memberCount} members`, inline: true }]);
        });
        await interaction.reply({ embeds: [guildEmbed], ephemeral: true });
    }
};