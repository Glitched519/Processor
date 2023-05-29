const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const os = require("os");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const subCmd = interaction.options._subcommand;
        const uptime = `<t:${Math.floor(Date.now() / 1000 - process.uptime())}:R>`;
        let version = require("../../../package.json").version;
        let djsVersion = require("../../../package.json").dependencies["discord.js"];
        const user = interaction.options.getUser("user");
        let infoEmbed;
        let row;

        switch (subCmd) {
            case "bot":
                infoEmbed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setTitle("My Stats")
                    .addFields([
                        { name: "Name", value: client.user.username, inline: true },
                        { name: "Up Since", value: uptime, inline: true },
                        { name: "Version", value: version, inlinestats: true },
                        { name: "Library", value: djsVersion, inline: true },
                        { name: "CPU Cores", value: os.cpus().length.toString(), inline: true },
                        { name: "Memory Usage", value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB"}`, inline: true },
                    ])
                    .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` });

                row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Website")
                            .setStyle("Link")
                            .setURL("https://processorbot.xyz/"),
                        new ButtonBuilder()
                            .setLabel("Discord")
                            .setStyle("Link")
                            .setURL("https://discord.gg/UNmdd8V"),
                        new ButtonBuilder()
                            .setLabel("GitHub")
                            .setStyle("Link")
                            .setURL("https://github.com/Glitched519/Processor"),
                    );
                break;

            case "server":
                infoEmbed = new EmbedBuilder()
                    .setColor("DarkButNotBlack")
                    .setTitle(`${interaction.guild.name}'s Stats`)
                    .addFields([
                        { name: "ID", value: interaction.guild.id, inline: true },
                        { name: "All Members", value: interaction.guild.memberCount.toString(), inline: true },

                    ]);
                row = null;
                break;

            case "user":
                infoEmbed = new EmbedBuilder()
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                    .setColor("DarkButNotBlack")
                    .setTitle(`${user.username}#${interaction.user.discriminator}'s Stats`)
                    .addFields([
                        { name: "ID", value: user.id, inline: true },
                        { name: "Bot", value: `${user.bot ? "✅" : "❌"}`, inline: true },
                    ])
                    .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` });
                row = null;
                break;
        }
        if (row === null)
            return await interaction.reply({ embeds: [infoEmbed] });
        return await interaction.reply({ embeds: [infoEmbed], components: [row] });
    },
    name: "stats",
    description: "Displays relevant statistics.",
    options: [
        {
            type: 1,
            name: "bot",
            description: "Displays stats about Processor."
        },
        {
            type: 1,
            name: "server",
            description: "Displays stats about this server."
        },
        {
            type: 1,
            name: "user",
            description: "Displays stats about selected user.",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "Target user",
                    required: true
                }
            ]
        }
    ]
}