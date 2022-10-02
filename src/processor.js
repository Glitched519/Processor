const { Client, GatewayIntentBits } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const config = require("./config.json");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    restTimeOffset: 0,
    disableMentions: "everyone",
    allowedMentions: {
        repliedUser: false,
    }
});

(async () => {

    process.stdout.write("[#    ]\033[0G");
    await client.login(config["bot-token"]);
    process.stdout.write("[##   ]\033[0G");

    client.commands = new Map();
    client.slashcommands = new Map();

    client.events = new Map();
    client.cooldowns = new Map();
    process.stdout.write("[###  ]\033[0G");
    await registerCommands(client, "../commands");
    process.stdout.write("[#### ]\033[0G");
    await registerEvents(client, "../events");
    process.stdout.write("[#####]\033[0G");

    client.emit("ready");
})();