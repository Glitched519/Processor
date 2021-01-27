const { MessageEmbed, MessageAttachment } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Triggered extends BaseCommand {
    constructor() {
        super('triggered', 'image', []);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let link = `https://some-random-api.ml/canvas/triggered/?avatar=${message.author.avatarURL({ format: 'png' })}`

        let attachment = new MessageAttachment(link, 'triggered.png');
        message.channel.send(attachment);
    }
}