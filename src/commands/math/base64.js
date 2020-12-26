const { api } = require("some-random-api");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Base64 extends BaseCommand {
    constructor() {
        super('base64', 'math', ['b64']);
    }

    run(client, message, args) {
        api.other.base64Encode(args[0]).then(res => {
            message.channel.send('`' + res.base64 + '`');
        });
    }
}