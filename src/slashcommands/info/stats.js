const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const os = require("os");

module.exports = {
    data: {
        "name": "stats",
        "description": "Displays relevant statistics.",
        "options": [
            {
                "type": 1,
                "name": "bot",
                "description": "Displays stats about Processor."
            },
            {
                "type": 1,
                "name": "server",
                "description": "Displays stats about this server."
            },
            {
                "type": 1,
                "name": "user",
                "description": "Displays stats about selected user.",
                "options": [
                    {
                        "type": 6,
                        "name": "user",
                        "description": "Target user",
                        "required": true
                    }
                ]
            }
        ]
    },
    async run(client, interaction) {
        const subCmd = interaction.options._subcommand;
        const uptime = `<t:${Math.floor(Date.now()/1000 - process.uptime())}:R>`;
        let version = require("../../../package.json").version;
        let djsVersion = require("../../../package.json").dependencies["discord.js"];
        const user = interaction.options.getUser("user");
        let infoEmbed;
        let row;

        switch (subCmd) {
            case "bot":
            infoEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("My Stats")
            .addField("Name", client.user.username, true)
            .addField("Up Since", uptime, true)
            .addField("Version", `${version}`, true)
            .addField("Library", `[discord.js](https://discord.js.org) (${djsVersion})`, true)
            .addField("CPU Cores", os.cpus().length.toString(), true)
            .addField("Memory Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB"}`, true);

            row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Website")
                    .setStyle("LINK")
                    .setURL("https://processorbot.xyz/"),
                new MessageButton()
                    .setLabel("Discord")
                    .setStyle("LINK")
                    .setURL("https://discord.gg/UNmdd8V"),
                new MessageButton()
                    .setLabel("GitHub")
                    .setStyle("LINK")
                    .setURL("https://github.com/Glitched519/Processor"),
            );
            break;

            case "server":
                infoEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${interaction.guild.name}'s Stats`)
                .addField("ID", interaction.guild.id, false)
                .addField("All Members", interaction.guild.memberCount.toString(), true);  
                row = null;
                break;

            case "user":
               infoEmbed = new MessageEmbed()
               .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                .setColor("RANDOM")
                .setTitle(`${user.username}#${interaction.user.discriminator}'s Stats`)
                .addField("ID", user.id, true)
                .addField("Bot", `${user.bot ? "✅" : "❌"}`, true);
                row = null;
                break;
        }
        if (row === null)
            return await interaction.reply({ embeds: [infoEmbed] });
        return await interaction.reply({ embeds: [infoEmbed], components: [row] });
    }
};