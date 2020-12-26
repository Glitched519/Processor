const fetch = require('node-fetch');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Joke extends BaseCommand {
    constructor() {
        super('joke', 'other', []);
    }

    run(client, message, args) {
        fetch('https://official-joke-api.appspot.com/random_joke')
            .then(res => res.json())
            .then(json => {
                message.channel.send(`${json.setup}\n||${json.punchline}||`);
            });
    }
}