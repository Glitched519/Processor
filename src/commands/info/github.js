const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Github extends BaseCommand {
  constructor() {
    super('github', 'info', ['code', 'source']);
  }

  run(client, message, args) {
    let codeEmbed = {
      color: `RANDOM`,
      title: "Here's All My Stuff!",
      description: ':arrow_right: [GitHub Link!](https://github.com/Glitched519/Processor) :arrow_left:',
      timestamp: new Date()
    }
    message.channel.send({ embed: codeEmbed });
  }
}