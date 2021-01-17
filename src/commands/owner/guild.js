const { MessageEmbed } = require('discord.js');
const { xDelete } = require('../../features/xdelete');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Guild extends BaseCommand {
    constructor() {
        super('guild', 'info', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;
        const guildEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${client.guilds.cache.size} Servers`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`)
        client.guilds.cache.forEach(guild => {
            guildEmbed.addField(`${guild.name}`, `${guild.memberCount} members`, true);
        });
        message.channel.send(guildEmbed)
        .then(msg => {
            xDelete(message, msg);
        })
    }
}