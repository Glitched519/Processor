const fetch = require('node-fetch');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Quote extends BaseCommand {
    constructor() {
        super('quote', 'other', []);
    }

    async run(client, message) {
        fetch('https://api.quotable.io/random')
            .then(res => res.json())
            .then(json => {
                message.channel.send({content: `> ${json.content}\n${json.author}`})
            });
    }
}