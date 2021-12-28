const { Client } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");
const nonPrivilegedIntents = [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_MESSAGES",
];

const client = new Client({
    intents: nonPrivilegedIntents,
    restTimeOffset: 0,
    disableMentions: "everyone",
    allowedMentions: {
        repliedUser: false,
    }
    // partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"]
});


(async () => {

    process.stdout.write("[#    ]\033[0G");
    await client.login(config["bot-token"]);
    process.stdout.write("[##   ]\033[0G");

    client.commands = new Map();
    client.slashcommands = new Map();

    client.events = new Map();
    client.cooldowns = new Map();
    client.prefix = config.prefix;
    process.stdout.write("[###  ]\033[0G");
    await registerCommands(client, "../commands");
    process.stdout.write("[#### ]\033[0G");
    await registerEvents(client, "../events");
    process.stdout.write("[#####]\033[0G");
    
    client.emit("ready");
})();

