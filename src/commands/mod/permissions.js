const { MessageEmbed } = require("discord.js");

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
            return message.channel.send(":x: **You need the `Manage Messages` permission to view my permissions.**")
        }
        const permissions = [
            "Administrator",
            "Send Messages",
            "Manage Messages",
            "Manage Roles",
            "Manage Channels",
            "Manage Webhooks",
            "Read Message History",
            "Change Nickname",
            "Manage Nicknames",
            "Kick Members",
            "Ban Members",
            "Embed Links",
            "Attach Files",
            "Add Reactions",
            "Connect",
            "Speak",
            "Mute Members",
            "Deafen Members",
            "Move Members",
            "Priority Speaker",
        ]
        permissions.sort();
        const me = message.guild.me;
        const yes = ':white_check_mark:';
        const no = ':x:';
        const permEmbed = new MessageEmbed()
            .setTitle(`${client.user.tag}'s Permissions`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
            .setDescription('Note: Not all permissions listed are required for the bot to fully function.')
            .setColor(`RANDOM`)
        permissions.forEach(perm => {
            let permName = perm.toUpperCase().replace(/ /g, "_");
            permEmbed.addField(perm, me.hasPermission(permName) ? yes : no, true);
        });

        if (me.hasPermission('EMBED_LINKS')) message.channel.send(permEmbed);

    },
    aliases: ['perm', 'perms'],
    description: 'Checks the permissions the bot has in the server'
}