const { MessageEmbed } = require("discord.js")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Slowmode extends BaseCommand {
    constructor() {
        super("slowmode", "mod", ["slow"])
    }

    async run(client, message, args) {
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
            return message.reply({ content: ":x: **I need the `Manage Channels` permission to change the slowmode.**" })
        }
        if (!message.member.permissions.has(["MANAGE_CHANNELS"])) {
            return message.reply({ content: ":x: **You need the `Manage Channels` permission to change the slowmode.**" })
        }
        if (!args[0]) {
            let rateLimitEmbed = new MessageEmbed()
                .setDescription(`The current slowmode is **${message.channel.rateLimitPerUser}** seconds.`)
                .setColor(`AQUA`)
            message.reply({ embeds: [rateLimitEmbed] })
        }
        else {
            if (isNaN(args[0])) {
                return message.reply({ content: "That is not a number." })
            } else if (args[0] > 21600 || args[0] < 0) {
                message.reply({ content: "Slowmode has a maximum of 21600 seconds (6h)."})
            }
            else {
                message.channel.setRateLimitPerUser(parseInt(args[0]), "")
                let newRateLimitEmbed = new MessageEmbed()
                    .setDescription(`Slowmode set to **${parseInt(args[0])}** seconds.`)
                    .setColor(`AQUA`)
                message.reply({ embeds: [newRateLimitEmbed] })
            }
        }
    }
}