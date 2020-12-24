const { slice } = require('methods');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Avatar extends BaseCommand {
  constructor() {
    super('avatar', 'info', ['pic', 'pfp', 'av']);
  }

  run(client, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (member) {
      return message.channel.send(member.user.displayAvatarURL());
    }
    else {
      return message.channel.send(message.author.displayAvatarURL());
    }
  }
}