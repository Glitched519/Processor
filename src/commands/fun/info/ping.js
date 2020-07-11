module.exports = {
    run: async(client, message, args) => {
            let pingEmbed = {
                color: `RANDOM`,
                title: "Ping?",
                description: `**Latency:** ?\n**API Latency:** ?`,
                timestamp: new Date()
            }
            const msg = await message.channel.send({embed: pingEmbed});        
            msg.edit(
                pingEmbed = {
                    color: `RANDOM`,
                    title: "Pong!",
                    description: `**Latency:** ${msg.createdTimestamp - message.createdTimestamp}ms\n**API Latency:** ${Math.round(message.client.ws.ping)}ms`,
                    timestamp: new Date()
                }
            );
            msg.delete();
            await message.channel.send({embed: pingEmbed});
        },
    aliases: ['alive'],
    description: 'Shows the ping'
}