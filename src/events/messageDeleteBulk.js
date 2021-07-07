const logSchema = require('../schemas/logs-schema')
const BaseEvent = require('../utils/structures/BaseEvent')
const { MessageEmbed } = require('discord.js')

module.exports = class MessageDeleteBulk extends BaseEvent {
    constructor() {
        super('messageDeleteBulk')
    }
    async run(client, messages) {
        const logChannelQuery = await logSchema.findOne({ _id: messages.first().guild.id })
        if (logChannelQuery == null) return
        const logChannel = logChannelQuery.channel
        let destination = client.channels.cache.get(logChannel.toString())
        if (!destination) return

        let deletedEmbed = new MessageEmbed()
            .setTitle(`${messages.size - 1} Messages Deleted`)
            .setDescription(`**Channel:** <#${messages.first().channel.id}>`)
            .setColor('DARK_RED')
            .setFooter(new Date().toLocaleTimeString())

        destination.send({ embeds: [deletedEmbed] })

    }
}