const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../../emojis.json');

module.exports = class Ping extends BaseCommand {
    constructor() {
        super('ping', 'info', ['alive']);
    }

    async run(client, message) {
        let pingEmbed = {
            title: emojis.loading
        }
        const msg = await message.channel.send({ embeds: [pingEmbed] });
        msg.edit(
            pingEmbed = {
                color: `RANDOM`,
                title: "Pong!",
                description: `${emojis.bot} **Bot Latency:** ${msg.createdTimestamp - message.createdTimestamp} ms\n${emojis.api} **API Latency:** ${Math.round(message.client.ws.ping)} ms`,
                timestamp: new Date()
            }
        );
        await msg.edit({ embeds: [pingEmbed] });
    }
}