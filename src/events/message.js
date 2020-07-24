const { exists, insertGuildMember, updateGuildMemberEXP } = require('../utils/database');
const { generateEXP, checkExperience } = require("../utils/random"); 
const PREFIX = process.env.PREFIX;

module.exports = async(client, message) => {	

	const badWords = ['fuck', 'shit'];
	const bannedWords = ['blowjob', 'incest', 'bona', 'boner', 
	'condom', 'cum', 'cunt', 'dildo', 'erection', 'faggot',
	'masturbate', 'nigg', 'nigeria', 'penis', 'pussy', 'slut',
	'vagina', 'wank', 'whore'];

	if (message.content.includes("<@&735270562544222290>")) {
		message.reply("you are about to ping all staff in the server. **Unless it's an emergency**, you will be punished for pinging this role. Reply with `call` **IN CAPS within 15 seconds** if you want to do this.");
		const filter = m => m.content.includes('CALL');
		message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
		.then(collected => {
			message.reply(`you have chosen to <@&701441802087170138>. Staff will come to address your issue urgently.`);
		})
		.catch(collected => {
			message.reply("time's up! Your staff call was declined.");
		});
	}
	for (let i = 0; i < badWords.length; i++) {        
		if (message.content.toLowerCase().includes(badWords[i])) {
				message.reply(`please watch your language even if swearing is allowed in ${message.guild.name}. Do not direct it at someone else.`)
				.then(msg => {
					msg.delete({timeout: 10000});
				});
			}
		}
	for (let i = 0; i < bannedWords.length; i++) {        
		if (message.content.toLowerCase().includes(bannedWords[i])) {
			message.delete();
				message.reply(`you are not allowed to say that word anywhere in ${message.guild.name}.`)

			}
		}  
    if(message.author.bot) return;
	if(!message.content.startsWith(PREFIX)) {
		const guildId = message.guild.id;
		const memberId = message.member.id;
		const result = (await exists(guildId, memberId))[0];
		if (result.length > 0) {
			const { experiencePoints, currentLevel } = result[0];
			const EXP = generateEXP();
			const updatedEXP = EXP + experiencePoints;
			const newLevel = checkExperience(updatedEXP, currentLevel);
			const update = await updateGuildMemberEXP(guildId, memberId, updatedEXP, newLevel);
		}
		else {
			await insertGuildMember(guildId, memberId)
				.catch((err) => console.log(err));
		}
		return;
	}
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
}