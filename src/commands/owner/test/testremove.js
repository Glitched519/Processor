const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestRemove extends BaseCommand {
    constructor() {
        super('testremove', 'setup', []);
    }

    async run(client, message) {
        if (message.author.id !== '749985510889619576') return;

        client.emit('guildDelete', message.guild);
    }
}