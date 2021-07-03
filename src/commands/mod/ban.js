const userReg = RegExp(/<@!?(\d+)>/)
const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Ban extends BaseCommand {
    constructor() {
        super('ban', 'mod', ['b'])
    }

    async run(client, message, args) {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send({ content: 'You need the `Ban Members` permission to ban a member.' })
        }
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send({ content: 'I need the `Ban Members` permission to ban a member.' })
        }
        if (!mentionedUser) {
            return message.channel.send({ content: 'You need to mention a member you want to ban.' })
        }

        const allBans = await message.guild.fetchBans()

        if (allBans.get(mentionedUser.id)) {
            return message.channel.send({ content: 'This member has already been banned.' })
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position

            if (memberPosition <= mentionedPosition) {
                return message.channel.send({ content: 'Cannot ban this member as their role is higher or equal to yours.' })
            }
            else if (botPosition <= mentionedPosition) {
                return message.channel.send({ content: 'Cannot ban this member as their role is higher or equal to mine.' })
            }
        }

        args.shift()
        const reason = args.join(' ')

        message.guild.members.ban(mentionedUser.id, { reason: reason })

        let banEmbed = new MessageEmbed()
            .setDescription(`Banned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`)
            .setColor('DARK_RED')
        message.channel.send({ embeds: [banEmbed] })
    }
}