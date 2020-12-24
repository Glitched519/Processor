const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Slowmode extends BaseCommand {
  constructor() {
    super('slowmode', 'mod', ['slow']);
  }

  run(client, message, args) {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(":x: **I need the `Manage Channels` permission to change the slowmode.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (!message.member.hasPermission(['MANAGE_CHANNELS'])) {
      return message.channel.send(":x: **You need the `Manage Channels` permission to change the slowmode.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (!args[0]) {
      return message.reply('the slowmode is **' + message.channel.rateLimitPerUser + ' seconds.**');
    }
    else {
      if (isNaN(args[0])) {
        return message.reply("That is not a number.")
          .then(msg => {
            msg.delete({ timeout: 4000 });
          });
      }
      else {
        message.channel.setRateLimitPerUser(parseInt(args[0]), "");
        message.channel.send("Slowmode set to **" + parseInt(args[0]) + ' seconds**.')
      }
    }
  }
}