const { EmbedBuilder } = require("discord.js");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const subCmd = interaction.options._subcommand;
        const user = interaction.options.getUser("user");
        let text = interaction.options.getString("text");

        switch (subCmd) {
            case "avatar":
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                            .setColor("DarkButNotBlack")
                            .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                    ]
                });
                break;
            case "comment":
                text = text.replace(/ /g, "%20");
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://some-random-api.com/canvas/youtube-comment?avatar=https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}&comment=${text}&username=${interaction.user.username}`)   
                            .setColor("DarkButNotBlack")
                            .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                    ]
                });
                break;
            default:
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage(`https://some-random-api.com/canvas/${subCmd}/?avatar=https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                            .setColor("DarkButNotBlack")
                            .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` })
                    ]
                });
        }
    },
    name: "image",
    description: "Displays an image.",
    options: [
        {
            type: 1,
            name: "avatar",
            description: "Shows a user's avatar",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "Selected user",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "comment",
            description: "Write a fake YouTube comment",
            options: [
                {
                    type: 3,
                    name: "text",
                    description: "Comment text",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "gay",
            description: "Applies the gay filter to a user's avatar",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "Selected user",
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "wasted",
            description: "Applies the wasted filter to a user's avatar",
            options: [
                {
                    type: 6,
                    name: "user",
                    description: "Selected user",
                    required: true
                }
            ]
        }
    ]
}