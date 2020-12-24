const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Userkick extends BaseCommand {
  constructor() {
    super('userkick', 'mod', ['kick', 'ukick', 'kickuser', 'userkick']);
  }

  async run(client, message, args) {
    let memberTag = args.shift();
    let reason = args.join(' ');

    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(":x: **I need the `Kick Members` permission to kick a member.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(":x: You need the `Kick Members` permission to kick a member.")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    let member = message.mentions.members.first();
    if (!member.kickable)
      return message.reply(":x: **Not possible to kick this member.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });

    if (reason == '') reason = "No reason provided.";

    await member.kick(reason)
      .catch(error => message.reply(`**Sorry ${message.author} I couldn't kick because of: ${error}**`));


    let kickEmbed = {
      title: ":boot: Member Kicked :boot: ",
      description: `**Member: **<@!${member.user.id}>\n**Reason: **${reason}`,
      color: "#fc6203",
      timestamp: new Date()
    }
    message.channel.send({ embed: kickEmbed });
  }
}