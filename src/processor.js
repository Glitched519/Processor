const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE'] });
const DBL = require("dblapi.js");
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const dbl = new DBL(config["dbl-token"], { webhookPort: 5000, webhookAuth: "ProcessorDaBest", webhookServer: server }, client);
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
	await client.login(config["bot-token"]);
	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');

	// dbl.on('posted', () => {
	// 	console.log('Server count posted!');
	// })

	dbl.on('error', e => {
		console.log(`Oops! ${e}`);
	})

	dbl.webhook.on('ready', hook => {
		console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
	});

	dbl.webhook.on('vote', vote => {
		console.log(`User with ID ${vote.user} just voted!`);
	});

	app.get('/dblwebhook', (req, res) => {
		console.log(req);
		console.log(res);
	});

	server.listen(5000, () => {
		console.log('Listening at http://localhost:5000.');
	});
})();

