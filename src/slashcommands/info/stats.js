const { MessageEmbed } = require("discord.js");
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
        const user = interaction.options.getUser("user");
        let infoEmbed;

        switch (subCmd) {
            case "bot":
            infoEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("My Stats")
            .addField("Name", client.user.username, true)
            .addField("Up Since", uptime, true)
            .addField("Version", `${version}`, true)
            .addField("Library", "[discord.js](https://discord.js.org)", true)
            .addField("Website", "[Website](https://processorbot.xyz/)", true)
            .addField("Discord", "[Invite](https://discord.gg/UNmdd8V)", true)
            .addField("GitHub", "[Repository](https://github.com/Glitched519/Processor)", true)
            .addField("CPU Cores", os.cpus().length.toString(), true)
            .addField("Memory Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB"}`, true);
            break;

            case "server":
                infoEmbed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${interaction.guild.name}'s Stats`)
                .addField("ID", interaction.guild.id, false)
                .addField("All Members", interaction.guild.memberCount.toString(), true);
                break;

            case "user":
               infoEmbed = new MessageEmbed()
               .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                .setColor("RANDOM")
                .setTitle(`${user.username}#${interaction.user.discriminator}'s Stats`)
                .addField("ID", user.id, true)
                .addField("Bot", `${user.bot ? "✅" : "❌"}`, true);
                break;
        }
        return await interaction.reply({ embeds: [infoEmbed] });
    }
};