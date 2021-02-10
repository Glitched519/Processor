const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestAdd extends BaseCommand {
    constructor() {
        super('testadd', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildCreate', message.guild);
    }
}