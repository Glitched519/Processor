const { MessageEmbed, MessageAttachment } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Author extends BaseCommand {
    constructor() {
        super('wasted', 'image', []);
    }

    async run(client, message, args) {
        let link = `https://some-random-api.ml/canvas/wasted/?avatar=${message.author.avatarURL({ format: 'png' })}`

        let attachment = new MessageAttachment(link, 'wasted.png');
        message.channel.send(attachment);
    }
}