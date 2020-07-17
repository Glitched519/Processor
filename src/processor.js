require('dotenv').config();
const discord = require('discord.js');
const { google } = require('googleapis');
const client = new discord.Client({partials: ['MESSAGE']});
const { checkCommandModule, checkProperties } = require('./utils/validate');
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/registry');
const { ErelaClient } = require('erela.js');

client.on('guildCreate', async (guild) => {
	try {
		await connection.query(
			`INSERT INTO Guilds VALUES ('${guild.id}', '${guild.ownerID}')`
		);
		await connection.query(
			`INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
		);
	}
	catch(err) {
		console.log(err);
	}
});

(async () => {
	await client.login(process.env.BOT_TOKEN);
	client.music = new ErelaClient(client, [{
			host: 'localhost',
			port: 7000,
			password: 'testing'
		}
	]);
	client.music.
	client.musicPlayers = new Map();
	client.commands = new Map();
	await registerMusicEvents(client.music, '../musicevents');
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');
})();

