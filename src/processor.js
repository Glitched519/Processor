const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE'] });
const Topgg = require("@top-gg/sdk");
const express = require('express')
const app = express();
const api = new Topgg.Api(config["topgg-token"]);
const webhook = new Topgg.Webhook(config["topgg-auth"]);
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
	await client.login(config["bot-token"]);
	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');

	setInterval(() => {
		api.postStats({
			serverCount: client.guilds.cache.size,
			//shardId: client.shard.ids[0], // if you're sharding
			//shardCount: client.options.shardCount
		})
	}, 1800000) // post every 30 minutes

	app.post('/dblwebhook', webhook.middleware(), (req, res) => {
		req.vote // your vote object
	}) // attach the middleware

	app.listen(3000)
})();