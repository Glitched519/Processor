const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Hexadecimal extends BaseCommand {
  constructor() {
    super('hexadecimal', 'math', ['hex', 'base16', 'b16']);
  }

  run(client, message, args) {
    message.channel.send('`' + Number(args[0]).toString(16).toUpperCase() + '`');
  }
}