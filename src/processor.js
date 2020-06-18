require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./utils/validate');
const tableConfig = require('./utils/tableConfig');
const { createStream, table } = require('table');
const c = require('ansi-colors');
const MessageModel = require('./database/models/message')
const database = require('./database/database');

const commandStatus = [
	[`${c.bold.yellow('Command')}`, `${c.bold.blue('Status')}`,`${c.bold.grey('Description')}`]
];
const PREFIX = process.env.PREFIX;

client.login(process.env.BOT_TOKEN);
client.commands = new Map();

let botChannels = ['720199033620267131', '689692941002080384'];
	
client.on('ready', () => {
	client.user.setActivity(`in new servers!`);
	console.log(`${new Date()} \n${client.user.tag} has logged in!`);
	let stream = createStream(tableConfig);
	let i = 0;
	let fn = setInterval(() => {
		if(i === commandStatus.length) {
			clearInterval(fn);
		}
		else {
		stream.write(commandStatus[i])
		i++;
	}
	}, 100);
});

const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);
client.on('message', async function(message) {
	if(message.author.bot) return;
	if(botChannels.includes()) {
		console.log("Correct channel!");
	}
	// else if (message.content.startsWith(PREFIX)) {
	// 	message.delete();
	// 	message.reply(':x: **You cannot run this command here.**')
  	// 	.then(msg => {
	// 		msg.delete({timeout: 5000});
	// 		setTimeout(function() {
	// 			msg.edit(':information_source: **Run it in the correct channel.**');
	// 		  }, 2000)
	// 	}).catch(console.error);
	// 	return;
	// }
	if(!message.content.startsWith(PREFIX)) return;
	let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();
	let argsToParse = message.content.substring(message.content.indexOf(' ') + 1);

	if(client.commands.get(cmdName)) {
		client.commands.get(cmdName)(client, message, argsToParse);
	}
	else {
		message.reply(':x: **Please enter a valid command.**')
  		.then(msg => {
			msg.delete({timeout: 4000});
			setTimeout(function() {
				msg.edit(':information_source: **Try running `$help` for all commands.**');
			  }, 1500)
		}).catch(console.error);
	}
});

(async function registerCommands(dir = 'commands') {
	// Reads the directory/file.
	let files = await fs.readdir(path.join(__dirname, dir));
	// Iterate through each file.
	for (let file of files) {
		let stat = await fs.lstat(path.join(__dirname, dir, file));
		if(stat.isDirectory()) { // If file is a directory, recursive call recurDir.
			registerCommands(path.join(dir, file));
		}
		else{
			// Check if file is a .js file.
			if(file.endsWith('.js')) {
				let	 cmdName = file.substring(0, file.indexOf('.js'));
				try {
					let cmdModule = require(path.join(__dirname, dir, file));
					if(checkCommandModule(cmdName, cmdModule)) {
						if(checkProperties(cmdName, cmdModule)) {
							let { aliases } = cmdModule;
							client.commands.set(cmdName, cmdModule.run);
							if (aliases.length !== 0) {
								aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
							}
							commandStatus.push(
								[`${c.white.bold(`${cmdName}`)}`, `${c.greenBright.bold('Running')}`, `${cmdModule.description}`]
							);
						}	
					}
				}
				catch (err) {
					console.log(err);
					commandStatus.push(
						[`${c.grey.bold(`${cmdName}`)}`, `${c.redBright.bold('Error')}`, `${cmdModule.description}`]
					);
				}
				
			}
		}
	}
})();