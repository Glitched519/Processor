const { api } = require("some-random-api");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Hug extends BaseCommand {
  constructor() {
    super('hug', 'cute', []);
  }

  run(client, message, args) {
    api.animu.hug().then(res => {
      let hugEmbed = {
        description: `**<@!${message.author.id}> hugs ${args}! Wholesome :blue_heart:**`,
        color: `RANDOM`,
        image: {
          url: res.link
        },
        timestamp: new Date()
      }
      if (!args[0]) hugEmbed.description = `**<@!${message.author.id}> hugs himself?**`;
      return message.channel.send({ embed: hugEmbed });
    }).catch(err => {
      message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not hug your love :cry:.");
    });
  }
}