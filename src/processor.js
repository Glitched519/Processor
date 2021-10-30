const { Client } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const config = require("./config.json");
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
    await client.login(config["bot-token"]).then(() => console.log("Logging In..."));
    console.log("Configuring Client Settings...");
    client.commands = new Map();
    client.events = new Map();
    client.cooldowns = new Map();
    client.prefix = config.prefix;
    await registerCommands(client, "../commands").then(() => console.log("Registering Commands..."));
    await registerEvents(client, "../events").then(() => console.log("Registering Events..."));

    client.emit("ready");
})();

