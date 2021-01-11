const Canvas = require('canvas');
const path = require('path');
const { MessageAttachment } = require('discord.js');

const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CanvasCmd extends BaseCommand {
    constructor() {
        super('canvas', 'other', ['cn']);
    }

    async run(client, message, args) {
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(path.join(__dirname, '../../pictures/background.jpg'));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 0, 200, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'example.png');

        message.channel.send(attachment);
    }
}