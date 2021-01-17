
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('./config.json');
const Topgg = require("@top-gg/sdk");
const { getAllFiles } = require('./utils/registry');
//const express = require('express');
//const app = express();
const api = new Topgg.Api(config["topgg-token"]);
//const webhook = new Topgg.Webhook(config["topgg-auth"]);
const client = new Client();
//const options = new ClientOptions();


(async () => {
    await client.login(config.token);
    client.commands = new Map();
    client.events = new Map();
    client.snipes = new Map();
    client.prefix = config.prefix;
    console.log('Client settings configured')
    await registerCommands(client, '../commands');
    console.log("Registered Commands");
    await registerEvents(client, '../events');
    console.log("Registered Events");

    setInterval(() => {
        api.postStats({
            serverCount: client.guilds.cache.size,
            // shardId: client.shard.ids[0], // Sharding
            shardCount: client.options.shardCount
        })
    }, 1800000) // post every 30 minutes
    console.log("Bot stats are being posted to top.gg.");

    // app.post('/dblwebhook', webhook.middleware(), (req, res) => {
    //     // req.vote is your vote object e.g
    //     console.log(req.vote.user) // user id
    // }) // attach the middleware

    // app.listen(3000)
})();

