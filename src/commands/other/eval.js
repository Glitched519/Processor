const { inspect } = require('util');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Eval extends BaseCommand {
  constructor() {
    super('eval', 'other', ['e']);
  }

  run(client, message, args) {
    if (args.length == 0) return;
    if (message.author.id !== '638064155965915187') return;

    try {
      const evaled = eval(args.join(' '));

      let evalEmbed = {
        title: 'Evaluated',
        color: `RANDOM`,
        description: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``,
      }
      message.channel.send({ embed: evalEmbed });
    }
    catch (err) {
      let errEmbed = {
        title: 'Error',
        color: '#f08324',
        description: `\`\`\`js\n${err}\`\`\``,
      }
      message.channel.send({ embed: errEmbed });
    }
  }
}