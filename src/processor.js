
const { Client, Intents } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('./config.json');
const Topgg = require("@top-gg/sdk");
//const express = require('express');
//const app = express();
const api = new Topgg.Api(config["topgg-token"]);
//const webhook = new Topgg.Webhook(config["topgg-auth"]);
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_EMOJIS'] } });    
//const options = new ClientOptions();

require("discord-buttons")(client);


(async () => {
    await client.login(config.token).then(() => console.log('Logging In...'));
    console.log('Configuring Client Settings...');
    client.commands = new Map();
    client.events = new Map();
    client.snipes = new Map();
    client.prefix = config.prefix;
    await registerCommands(client, '../commands').then(() => console.log("Registering Commands..."));
    await registerEvents(client, '../events').then(() => console.log("Registering Events..."));

    setInterval(() => {
        api.postStats({
            serverCount: client.guilds.cache.size,
            // shardId: client.shard.ids[0], // Sharding
            shardCount: client.options.shardCount
        });
    }, 1800000) // post every 30 minutes
    console.log("Started Posting Bot Stats on top.gg.");

    console.log("Non-Privileged Intents: %d", Intents.NON_PRIVILEGED);
    console.log("Guilds: %d", client.guilds.cache.size);

    // app.post('/dblwebhook', webhook.middleware(), (req, res) => {
    //     // req.vote is your vote object e.g
    //     console.console.log(req.vote.user) // user id
    // }) // attach the middleware

    // app.listen(3000)
    console.log('Awaiting Ready Event...');
    client.emit("ready");
})();

