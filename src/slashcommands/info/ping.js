module.exports = {
    data: {
        name: "ping",
        description: "Shows the bot's ping.",
    },
    async run(client, interaction) {
        interaction.reply({
            content: `Pong! ${client.ws.ping}ms`,
            ephemeral: true
        });
    }
};