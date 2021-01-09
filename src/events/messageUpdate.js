const mongo = require('../features/mongo');
const logSchema = require('../schemas//logs-schema');
const BaseEvent = require('../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageUpdate extends BaseEvent {
    constructor() {
        super('messageUpdate');
    }
    async run(client, oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        const logChannelQuery = await logSchema.findOne({ _id: oldMessage.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());

        let editedEmbed = new MessageEmbed()
        .setTitle(`Message Edited by ${oldMessage.author.tag}`)
        .setDescription(`**Channel:** <#${oldMessage.channel.id}>\n**Old Message:** ${oldMessage.content}\n**New Message:** ${newMessage.content}`)
        .setColor('YELLOW')
        .setFooter(new Date().toLocaleTimeString());
        
        destination.send(editedEmbed);

    }
}