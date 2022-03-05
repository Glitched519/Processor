const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        "name": "guilds",
        "description": "View guilds (owner only)",
    },
    async run(client, interaction) {
        if (interaction.user.id !== "749985510889619576") return await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Not Allowed")
                    .setColor("YELLOW")
                    .setDescription("Only the owner can run this command.")
            ], ephemeral: true
        });
        const guildEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${client.guilds.cache.size} Servers`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
            .setTimestamp();
        client.guilds.cache.forEach(guild => {
            guildEmbed.addField(`${guild.name}`, `${guild.memberCount} members`, true);
        });
        await interaction.reply({ embeds: [guildEmbed], ephemeral: true });
    }
};