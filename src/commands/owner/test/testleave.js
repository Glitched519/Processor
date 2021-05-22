const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestLeave extends BaseCommand {
    constructor() {
        super('testleave', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '749985510889619576') return;

        client.emit('guildMemberRemove', message.member);
    }
}