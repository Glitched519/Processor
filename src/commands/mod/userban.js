const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Userban extends BaseCommand {
  constructor() {
    super('userban', 'mod', ['ban', 'uban', 'banuser', 'userban']);
  }

  async run(client, message, args) {
    let memberTag = args.shift();
    let reason = args.join(' ');

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return message.channel.send(":x: **I need the `Ban Members` permission to ban a member.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send(":x: **You need the `Ban Members` permission to ban a member.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }

    let member = message.mentions.members.first();
    if (!member)
      return message.reply(":x: **Please mention a valid member of this server.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    if (!member.bannable)
      return message.reply(":x: **Not possible to ban this member.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });

    if (reason == '') reason = "No reason provided.";

    await member.ban({ days: 7, reason: reason })
      .catch(error => message.reply(`**Sorry ${message.author}. I couldn't ban because of: ${error}**`));
    message.guild.members.ban(member);

    let banEmbed = {
      title: ":hammer_pick: Member Banned :hammer_pick: ",
      description: `**Member: **<@!${member.user.id}>\n**Reason: **${reason}`,
      color: "#fc1c03",
      timestamp: new Date()
    }
    message.channel.send({ embed: banEmbed });
  }
}