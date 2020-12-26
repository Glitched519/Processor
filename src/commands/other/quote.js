const fetch = require('node-fetch');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Quote extends BaseCommand {
    constructor() {
        super('quote', 'other', []);
    }

    run(client, message, args) {
        fetch('https://api.quotable.io/random')
            .then(res => res.json())
            .then(json => {
                message.channel.send(`> ${json.content}\n${json.author}`)
            });
    }
}