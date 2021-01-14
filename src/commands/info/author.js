const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Author extends BaseCommand {
    constructor() {
        super('author', 'info', ['creator', 'dev', 'developer']);
    }

    run(client, message, args) {
        let authorEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Hi, I'm ${client.user.tag}`)
            .setAuthor('I am currently being developed by <@!638064155965915187> and <@!749985510889619576> :blue_heart:')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

        message.channel.send(authorEmbed);
    }
}