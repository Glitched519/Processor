const { MessageEmbed, MessageAttachment } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Gay extends BaseCommand {
    constructor() {
        super('gay', 'image', []);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        console.log(mentionedMember)
        let link = `https://some-random-api.ml/canvas/gay/?avatar=${message.author.avatarURL({ format: 'png' })}`

        let attachment = new MessageAttachment(link, 'gay.png');
        message.channel.send(attachment);
    }
}