const BaseEvent = require('../utils/structures/BaseEvent');
const { leave } = require('../emojis.json');
const { MessageEmbed } = require('discord.js');

module.exports = class GuildDelete extends BaseEvent {
    constructor() {
        super('guildDelete');
    }
    async run(client, guild) {
        let destination = client.channels.cache.get('797849546612932668');
        const leaveEmbed = new MessageEmbed()
        .setTitle(`${leave} **${guild}** removed ${client.user.tag}`)
        .setColor('RED')
        .setFooter(`Currently in ${client.guilds.cache.size} servers`)
        destination.send(leaveEmbed)
    }
}