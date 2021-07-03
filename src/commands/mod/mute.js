const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const muteSchema = require('../../schemas/mute-schema')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Mute extends BaseCommand {
    constructor() {
        super('mute', 'mod', ['m', 'shut'])
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const msRegex = RegExp(/(\d+(s|m|h|d|w))/)
        let muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.channel.send('You need the `Manage Roles` permission to mute a member.')
        }
        if (!message.guild.me.permissions.has(['MANAGE_ROLES', 'MANAGE_CHANNELS'])) {
            return message.channel.send('I need the `Manage Roles` and `Manage Channels` permissions to mute a member.')
        }
        if (!mentionedMember) {
            return message.channel.send('You need to mention a member you want to mute.')
        }
        if (!msRegex.test(args[1])) {
            return message.channel.send('Invalid mute time.')
        }
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'RED',
                }
            }).catch(err => {
                return message.channel.send("Failed to create muted role: " + err)
            })
        }

        if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('Cannot mute this member as their roles are higher or equal to mine.')
        }
        if (muteRole.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('Cannot muted this member as the `Muted` role is higher than mine.')
        }
        if (ms(msRegex.exec(args[1])[1]) > 2592000000) {
            return message.channel.send("You can't mute a member for more than a month.")
        }

        const isMuted = await muteSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id
        })

        if (isMuted) {
            return message.channel.send('This member is already muted.')
        }

        for (const channel of message.guild.channels.cache) {
            channel[1].updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
            }).catch(err => console.log(err))
        }

        const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone')

        await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))

        for (const role of noEveryone) {
            await mentionedMember.roles.remove(role[0]).catch(err => console.log(err))
        }

        const muteDoc = new muteSchema({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
            length: Date.now() + ms(msRegex.exec(args[1])[1]),
            memberRoles: noEveryone.map(r => r),
        })

        await muteDoc.save().catch(err => console.log(err))

        const reason = args.slice(2).join(' ')

        let muteEmbed = new MessageEmbed()
            .setDescription(`Muted ${mentionedMember} for **${msRegex.exec(args[1])[1]}** ${reason ? `for **${reason}**` : ''}`)
            .setColor('GREY')

        message.channel.send({ embeds: [muteEmbed] })
    }
}