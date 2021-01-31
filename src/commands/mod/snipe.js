const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class Snipe extends BaseCommand {
    constructor() {
        super('snipe', 'mod', ['s']);
    }

    async run(client, message, args) {
        const msg = client.snipes.get(message.channel.id);
        if (msg == null) return message.channel.send("There's no message to snipe.");
        if (msg.content.endsWith("snipe".toLowerCase())) return message.channel.send("There's no message to snipe.");

        const snipeEmbed = new MessageEmbed()
            .setAuthor(msg.author, msg.member.user.displayAvatarURL())
            .setColor('RED')
            .setDescription(msg.content)
            .setFooter('Get Sniped lmao')
            .setTimestamp();

            message.channel.send(snipeEmbed);

    }
}