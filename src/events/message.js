const StateManager = require("../utils/StateManager");
const { exists, insertGuildMember, updateGuildMemberEXP } = require('../utils/database');
const { generateEXP, checkExperience } = require("../utils/random"); 
const PREFIX = process.env.PREFIX;

module.exports = async(client, message) => {
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
				.then(() => console.log('Inserted into DB.'))
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