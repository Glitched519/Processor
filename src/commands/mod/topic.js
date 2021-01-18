const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Topic extends BaseCommand {
    constructor() {
        super('topic', 'mod', []);
    }

    async run(client, message, args) {
        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(":x: **I need the `Manage Channels` permission change the topic of this channel.**")
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(":x: **You need the `Manage Channels` permission change the topic of this channel.**")
        }
        if (args.length == 0) return;
        message.channel.setTopic(args.join(" "))
            .then(updated => message.channel.send(new MessageEmbed()
                .setDescription(`<#${message.channel.id}>'s new topic is **${updated.topic}**.`)
                .setColor('LIGHT_GREY')
            )
            )
            .catch(console.error);
    }
}