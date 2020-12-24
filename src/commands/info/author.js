const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Author extends BaseCommand {
  constructor() {
    super('author', 'info', ['creator', 'dev', 'developer']);
  }

  run(client, message, args) {
    let authorEmbed = {
      color: `RANDOM`,
      title: `Hi, I'm ${client.user.tag}`,
      description: 'I am currently being developed by <@!638064155965915187> and <@!749985510889619576> :blue_heart:',
      thumbnail: {
        url: client.user.displayAvatarURL(),
      },
      timestamp: new Date()
    };
    message.channel.send({ embed: authorEmbed });
  }
}