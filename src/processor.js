
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('./config.json');
const Topgg = require("@top-gg/sdk");
const express = require('express');
const app = express();
const api = new Topgg.Api(config["topgg-token"]);
const webhook = new Topgg.Webhook(config["topgg-auth"]);
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);

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

