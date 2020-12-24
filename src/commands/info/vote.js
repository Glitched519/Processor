const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Vote extends BaseCommand {
  constructor() {
    super('vote', 'info', []);
  }

  run(client, message, args) {
    let voteEmbed = {
      color: `RANDOM`,
      title: "Vote for Me!",
      description: ':arrow_right: [Vote Me on top.gg!](https://top.gg/bot/689678745782714464/vote) :arrow_left:',
      footer: `Thanks for all the support :blue_heart:`
    }
    message.channel.send({ embed: voteEmbed });
  }
}