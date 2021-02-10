const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestLeave extends BaseCommand {
    constructor() {
        super('testleave', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildMemberRemove', message.member);
    }
}