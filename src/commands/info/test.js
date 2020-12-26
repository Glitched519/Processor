const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../../emojis.json');

module.exports = class Online extends BaseCommand {
    constructor() {
        super('test', 'info', []);
    }

    run(client, message, args) {
        message.channel.send("Hi1");
        setTimeout(() => {
            message.channel.send("Hi2");
        }, 500)
    }
}