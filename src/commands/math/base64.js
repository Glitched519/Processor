const axios = require("axios").default
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Base64 extends BaseCommand {
    constructor() {
        super('base64', 'math', ['b64'])
    }

    async run(client, message, args) {
        const options = {
            method: 'GET',
            url: `https://some-random-api.ml/base64?encode=${args.join(' ')}`,
        }

        axios.request(options).then(response => {
            return message.channel.send({ content: '`' + response.data.base64 + '`' })
        }).catch(err => {
            return message.channel.send({ content: err })
        })
    }
}