const { MessageEmbed, MessageAttachment } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Wasted extends BaseCommand {
    constructor() {
        super('wasted', 'image', []);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let link = mentionedMember ? `https://some-random-api.ml/canvas/wasted/?avatar=${mentionedMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })}` : `https://some-random-api.ml/canvas/wasted/?avatar=${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`;

        message.channel.send({ content: link });
    }
}