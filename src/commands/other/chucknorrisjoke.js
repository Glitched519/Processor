const fetch = require('node-fetch');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ChuckNorrisJoke extends BaseCommand {
  constructor() {
    super('chucknorrisjoke', 'other', ['chuck', 'chuckjoke', 'norrisjoke', 'cjoke']);
  }

  run(client, message, args) {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(json => {
        message.channel.send(json.value);
      });
  }
}