const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Slowmode extends BaseCommand {
    constructor() {
        super('slowmode', 'mod', ['slow'])
    }

    async run(client, message, args) {
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: ":x: **I need the `Manage Channels` permission to change the slowmode.**" })
        }
        if (!message.member.permissions.has(['MANAGE_CHANNELS'])) {
            return message.channel.send({ content: ":x: **You need the `Manage Channels` permission to change the slowmode.**" })
        }
        if (!args[0]) {
            let rateLimitEmbed = new MessageEmbed()
                .setDescription(`The current slowmode is **${message.channel.rateLimitPerUser}** seconds.`)
                .setColor(`AQUA`)
            message.channel.send({ embeds: [rateLimitEmbed] })
        }
        else {
            if (isNaN(args[0])) {
                return message.reply("That is not a number.")
                    .then(msg => {
                        msg.delete({ timeout: 4000 })
                    })
            } else if (args[0] > 21600) {
                return message.reply("Slowmode has a maximum of 21600 seconds (6h).")
                    .then(msg => {
                        msg.delete({ timeout: 4000 })
                    })
            }
            else {
                message.channel.setRateLimitPerUser(parseInt(args[0]), "")
                let newRateLimitEmbed = new MessageEmbed()
                    .setDescription(`Slowmode set to **${parseInt(args[0])}** seconds.`)
                    .setColor(`AQUA`)
                message.channel.send({ embeds: [newRateLimitEmbed] })
            }
        }
    }
}