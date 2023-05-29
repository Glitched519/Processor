const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const emojis = require("../../emojis.json");

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
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
            .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms` });
        permissions.forEach(perm => {
            let permName = perm.toUpperCase().replace(/ /g, "_");
            props += `${me.permissions.has(permName) ? yes : no}  ${perm}\n`;
        });
        permEmbed.setDescription(props);

        await interaction.reply({ embeds: [permEmbed], ephemeral: true });
    },
    deleted: true,
    name: "perms",
    description: "Shows the bot's permissions in this server.",
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.EmbedLinks],
}