const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE'] });
const DBL = require("dblapi.js");
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const dbl = new DBL(config["dbl-token"], { webhookAuth: 'password', webhookServer: server });
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
	await client.login(config["bot-token"]);
	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');
	dbl.webhook.on('ready', hook => {
		console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
	});
	
	dbl.webhook.on('vote', vote => {
		console.log(`User with ID ${vote.user} just voted!`);
		// Do what you need to do
	  });

	app.get('/', (req, res) => {
		
	});
	
	server.listen(5000, () => {
	console.log('Listening');
	});
})();

