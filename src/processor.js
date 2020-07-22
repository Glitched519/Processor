require('dotenv').config();
const discord = require('discord.js');
const { google } = require('googleapis');
const client = new discord.Client({partials: ['MESSAGE']});
const { checkCommandModule, checkProperties } = require('./utils/validate');
const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/registry');

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

client.on('guildMemberRemove', member => {
	const leaveChannel = member.guild.channels.cache.find(channel => channel.name.includes('goodbye'));
	leaveChannel.send(`${member} just left ${member.guild.name}. Bye!`);
});

(async () => {
	await client.login(process.env.BOT_TOKEN);

	client.commands = new Map();
	await registerEvents(client, '../events');
	await registerCommands(client, '../commands');
})();

