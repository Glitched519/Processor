module.exports = {
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply({
            content: `Pong!\nClient: ${ping}ms\nWebsocket: ${client.ws.ping}ms`,
            ephemeral: true
        });
    },
    name: 'ping',
    description: 'Pong!',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,
}