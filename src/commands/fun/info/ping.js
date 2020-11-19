module.exports = {
    run: async (client, message, args) => {
        let pingEmbed = {

        }
        const msg = await message.channel.send({ embed: pingEmbed });
        pingEmbed = {
            color: `RANDOM`,
            title: "Pong!",
            description: `**Latency:** ${msg.createdTimestamp - message.createdTimestamp}ms\n**API Latency:** ${Math.round(message.client.ws.ping)}ms`,
            timestamp: new Date()
        }
        msg.edit({embed: pingEmbed});
    },
    aliases: ['alive'],
    description: 'Shows the ping'
}