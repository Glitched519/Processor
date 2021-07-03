const fetch = require('node-fetch')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class ChuckNorrisJoke extends BaseCommand {
    constructor() {
        super('chucknorrisjoke', 'other', ['chuck', 'chuckjoke', 'norrisjoke', 'cjoke'])
    }

    async run(client, message) {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(res => res.json())
            .then(json => {
                message.channel.send({ content: json.value })
            })
    }
}