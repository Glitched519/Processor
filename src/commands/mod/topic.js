const { MessageEmbed } = require('discord.js')

const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Topic extends BaseCommand {
    constructor() {
        super('topic', 'mod', [])
    }

    async run(client, message, args) {
        if (message.guild.me.permissions.has('MANAGE_MESSAGES')) message.delete()
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: ":x: **I need the `Manage Channels` permission change the topic of this channel.**" })
        }
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: ":x: **You need the `Manage Channels` permission change the topic of this channel.**" })
        }
        if (args.length == 0) return
        message.channel.setTopic(args.join(" "))
            .then(updated => {
                let updatedTopicEmbed = new MessageEmbed()
                    .setDescription(`<#${message.channel.id}>'s new topic is **${updated.topic}**.`)
                    .setColor('LIGHT_GREY')
                message.channel.send({ embeds: [updatedTopicEmbed] })
            }
            )
            .catch(console.error)
    }
}