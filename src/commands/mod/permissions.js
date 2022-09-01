const { EmbedBuilder } = require("discord.js");
const emojis = require("../../emojis.json");

module.exports = {
    data: {
        name: "permissions",
        description: "Shows the bot permissions",
    },
    async run(client, interaction) {
        const initTime = Date.now();
        if (!interaction.memberPermissions.has("MANAGE_MESSAGES")) {
            return interaction.reply({ content: ":x: **You need the `Manage Messages` permission to view my permissions.**" });
        }
        const permissions = [
            "Create Instant Invite",
            "Kick Members",
            "Ban Members",
            "Administrator",
            "Manage Channels",
            "Manage Guild",
            "Add Reactions",
            "View Audit Log",
            "Priority Speaker",
            "Stream",
            "View Channel",
            "Send Messages",
            "Send TTS Messages",
            "Manage Messages",
            "Embed Links",
            "Attach Files",
            "Read Message History",
            "Mention Everyone",
            "Use External Emojis",
            "View Guild Insights",
            "Connect",
            "Speak",
            "Mute Members",
            "Deafen Members",
            "Move Members",
            "Use VAD",
            "Change Nickname",
            "Manage Nicknames",
            "Manage Roles",
            "Manage Webhooks",
            "Create Public Threads",
            "Create Private Threads",
            "Send Messages in Threads",
            "Manage Threads"
        ];
        permissions.sort();
        const me = interaction.guild.me;
        const yes = emojis.yes;
        const no = emojis.no;
        let props = "";
        const permEmbed = new EmbedBuilder()
            .setTitle(`${client.user.tag}'s Permissions (${permissions.length})`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
            // .setDescription(`Note: Not all permissions listed are required for the bot to fully function.\n${yes} Enabled | ${no} Disabled`)
            .setColor("DarkButNotBlack")
            .setFooter({ text: `⏱️ ${Date.now() - initTime} ms` });
        permissions.forEach(perm => {
            let permName = perm.toUpperCase().replace(/ /g, "_");
            props += `${me.permissions.has(permName) ? yes : no}  ${perm}\n`;
        });
        permEmbed.setDescription(props);

        if (me.permissions.has("EMBED_LINKS")) await interaction.reply({ embeds: [permEmbed], ephemeral: true });
    }
};