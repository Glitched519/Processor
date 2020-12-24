const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../../emojis.json');

module.exports = class Online extends BaseCommand {
  constructor() {
    super('online', 'info', []);
  }

  run(client, message, args) {
    var onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size;
    message.channel.send(`${emojis.online} There are currently **${onlineCount}** members online in ${message.guild.name}.`);
  }
}