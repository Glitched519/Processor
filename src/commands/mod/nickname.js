const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Nickname extends BaseCommand {
	constructor() {
		super('nickname', 'mod', ['nick', 'name']);
	}

	async run(client, message, args) {
		if (!args[0]) return;
		if (!message.guild.me.hasPermission(['MANAGE_NICKNAMES'])) {
			return message.channel.send(":x: **I need the `Manage Nicknames` permission to change a member's nickname.**")
				.then(msg => {
					msg.delete({ timeout: 4000 });
				});
		}
		if (!message.member.hasPermission(['MANAGE_NICKNAMES'])) {
			return message.channel.send(":x: **You need the `Manage Nicknames` permission to change a member's nickname.**")
				.then(msg => {
					msg.delete({ timeout: 4000 });
				});
		}
		if (args[0].startsWith("<@") && args[0].endsWith(">") && !args[1]) {
			return message.channel.send(":grey_question: **You need to specify a nickname to give to this member.**");
		}
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!args[1]) {
			return message.channel.send(":grey_question: **You need to specify a nickname to give to this member.**");
		}
		if (!member) {
			return message.channel.send(":x: **You need to specify an existing member.**")
				.then(msg => {
					msg.delete({ timeout: 4000 });
				});
		}
		const newNickname = args[1];

		member.setNickname(newNickname)
			.catch(err => {
				message.channel.send(":x: **Cannot change nickname. The member has a higher role than me.**");
			})
	}
}