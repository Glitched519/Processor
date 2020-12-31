const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../../emojis.json');

module.exports = class Ping extends BaseCommand {
    constructor() {
        super('ping', 'info', ['alive']);
    }

    async run(client, message, args) {
        let pingEmbed = {
            color: `RANDOM`,
            title: ":ping_pong: Pong!",
            description: `${emojis.bot} **Bot Latency:** ${Math.abs(Date.now() - message.createdTimestamp)}ms\n${emojis.api} **API Latency:** ${Math.round(client.ws.ping)}ms`,
            timestamp: new Date()
        }
        await message.channel.send({ embed: pingEmbed });
    }
}