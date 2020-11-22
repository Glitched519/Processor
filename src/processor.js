require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE'] });
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, client);
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
	await client.login(process.env.BOT_TOKEN);
	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');
	dbl.on('posted', () => {
		console.log('Server count posted!');
	})
	dbl.getBot(client.user.id).then(bot => {
    	console.log(bot.username)
	});
	dbl.getStats(client.user.id).then(stats => {
    	console.log(stats.shards)
	});
	  
	dbl.on('error', e => {
		console.log(`Oops! ${e}`);
	})
})();

