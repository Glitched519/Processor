const { MessageEmbed } = require("discord.js")
const emojis = require('../../emojis.json')
const { xDelete } = require('../../features/xdelete')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Permissions extends BaseCommand {
    constructor() {
        super('permissions', 'mod', ['perm', 'perms'])
    }

    async run(client, message) {
        if (!message.member.permissions.has(['MANAGE_MESSAGES'])) {
            return message.reply({ content: ":x: **You need the `Manage Messages` permission to view my permissions.**" })
        }
        const permissions = [
            'Create Instant Invite',
            'Kick Members',
            'Ban Members',
            'Administrator',
            'Manage Channels',
            'Manage Guild',
            'Add Reactions',
            'View Audit Log',
            'Priority Speaker',
            'Stream',
            'View Channel',
            'Send Messages',
            'Send TTS Messages',
            'Manage Messages',
            'Embed Links',
            'Attach Files',
            'Read Message History',
            'Mention Everyone',
            'Use External Emojis',
            'View Guild Insights',
            'Connect',
            'Speak',
            'Mute Members',
            'Deafen Members',
            'Move Members',
            'Use VAD',
            'Change Nickname',
            'Manage Nicknames',
            'Manage Roles',
            'Manage Webhooks',
            'Manage Emojis',
        ]
        permissions.sort()
        const me = message.guild.me
        const yes = emojis.yes
        const no = emojis.no
        let props = ''
        const permEmbed = new MessageEmbed()
            .setTitle(`${client.user.tag}'s Permissions`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
            // .setDescription(`Note: Not all permissions listed are required for the bot to fully function.\n${yes} Enabled | ${no} Disabled`)
            .setColor(`RANDOM`)
        permissions.forEach(perm => {
            let permName = perm.toUpperCase().replace(/ /g, "_")
            props += `${me.permissions.has(permName) ? yes : no}  ${perm}\n`
        })
        permEmbed.setDescription(props)

        if (me.permissions.has('EMBED_LINKS')) message.reply({ embeds: [permEmbed] }).then(msg => {
            return xDelete(message, msg)
        })

    }
}
