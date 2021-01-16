const Canvas = require('canvas');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
const welcomeSchema = require('../schemas/welcome-schema');

// Passing the entire Canvas object to access its width, as well its context
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};

module.exports = class GuildMemberAdd extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }
    async run(client, member) {
        const { guild } = member;
        const welcomeChannelQuery = await welcomeSchema.findOne({ _id: guild.id });
        if (welcomeChannelQuery == null) return;
        let welcomeChannel = welcomeChannelQuery.channel;
        let destination = client.channels.cache.get(welcomeChannel.toString());

        // Set a new canvas to the dimensions of 700x250 pixels
        const canvas = Canvas.createCanvas(700, 250);
        // ctx (context) will be used to modify a lot of the canvas
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(path.join(__dirname, '../pictures/background.png'));
        let x = 0;
        let y = 0;
        ctx.drawImage(background, x, y);

        // Select the color of the stroke
        ctx.strokeStyle = '#74037b';
        // Draw a rectangle with the dimensions of the entire canvas
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Select the font size and type from one of the natively available fonts
        ctx.font = '60px sans-serif';
        // Select the style that will be used to fill the text in
        ctx.fillStyle = '#ffffff';
        // Actually fill the text with a solid color
        ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

        // Slightly smaller text placed above the member's display name
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

        // Even smaller text placed below the member's display name
        ctx.font = '24px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Member #${guild.memberCount}`, canvas.width / 2.5, canvas.height - 25);

        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${member.displayName}!`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();

        // Wait for Canvas to load the image
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        // Move the image downwards vertically and constrain its height to 200, so it's a square
        ctx.drawImage(avatar, 25, 25, 200, 200);

        // Use helpful Attachment class structure to process the file for you
        const attachment = new MessageAttachment(canvas.toBuffer());

        destination.send('', attachment);
    }
}