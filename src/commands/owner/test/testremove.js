const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestRemove extends BaseCommand {
    constructor() {
        super('testremove', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildDelete', message.guild);
    }
}