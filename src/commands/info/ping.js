const emojis = require('../../emojis.json');

module.exports = {
    run: async (client, message, args) => {
        let pingEmbed = {
            title: `${emojis.loading}`
        }
        const msg = await message.channel.send({ embed: pingEmbed });
        msg.edit(
            pingEmbed = {
                color: `RANDOM`,
                title: "Pong!",
                description: `**Latency:** ${msg.createdTimestamp - message.createdTimestamp}ms\n**API Latency:** ${Math.round(message.client.ws.ping)}ms`,
                timestamp: new Date()
            }
        );
        await msg.edit({ embed: pingEmbed });
    },
    aliases: ['alive'],
    description: 'Shows the ping'
}