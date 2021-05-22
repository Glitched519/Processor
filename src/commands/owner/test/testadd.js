const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestAdd extends BaseCommand {
    constructor() {
        super('testadd', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '749985510889619576') return;

        client.emit('guildCreate', message.guild);
    }
}