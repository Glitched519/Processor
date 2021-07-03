const { MessageEmbed } = require('discord.js')
const { xDelete } = require('../../features/xdelete')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Guild extends BaseCommand {
    constructor() {
        super('guild', 'owner', [])
    }

    async run(client, message) {
        if (message.author.id !== '749985510889619576') return
        const guildEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${client.guilds.cache.size} Servers`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
        client.guilds.cache.forEach(guild => {
            guildEmbed.addField(`${guild.name}`, `${guild.memberCount} members`, true)
        })
        message.channel.send({embeds: [guildEmbed]})
        .then(msg => {
            xDelete(message, msg)
        })
    }
}