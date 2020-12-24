const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Base32 extends BaseCommand {
  constructor() {
    super('base32', 'math', ['b32']);
  }

  run(client, message, args) {
    message.channel.send('`' + Number(args[0]).toString(32).toUpperCase() + '`');
  }
}