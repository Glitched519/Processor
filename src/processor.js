require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({partials: ['MESSAGE']});
const { checkCommandModule, checkProperties } = require('./utils/validate');
const { registerCommands, registerEvents } = require('./utils/registry');
let connection;

const guildCommandPrefixes = new Map();

client.on('ready', () => {
	console.log(`${new Date()} \n${client.user.tag} has logged in!`);
	client.guilds.cache.forEach(guild => {
		connection.query(
			`SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
		).then(result => {
			guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
		}).catch(err => console.log(err));
	});
});

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

client.on('message', async (message) => {
	if (message.author.bot) return;
	const prefix = guildCommandPrefixes.get(message.guild.id);
	console.log(prefix);
	if (message.content.startsWith(prefix + "help")) {
		message.channel.send(`You triggered this command with the prefix: ${prefix}`);
	}
});

(async () => {
	connection = await require('../database/db');
	await client.login(process.env.BOT_TOKEN);
	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');
})();
