const { Client, IntentsBitField } = require('discord.js');
const config = require ('./config.json');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
    ]
});

(async () => {
    await mongoose.connect(config["mongo-path"], {
        autoCreate: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => {
        console.error("Could not connect due to the following error: " + error);
    })
    eventHandler(client);
})();

client.login(config['bot-token']);