const { inspect } = require("util");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        let totalMembers = 0;
        client.guilds.cache.forEach(guild => {
            totalMembers += guild.memberCount;
            console.log(`${guild.name} with ${guild.memberCount} members`)
        });
        const guildEmbed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setTitle(`${client.guilds.cache.size} Servers`)
            .setDescription(`${totalMembers} total members`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)

        await interaction.reply({ embeds: [guildEmbed], ephemeral: true });
    },
    devOnly: true,
    testOnly: true,
    name: "guilds",
    description: "View guilds (owner only)",
}