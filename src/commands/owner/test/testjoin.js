const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestJoin extends BaseCommand {
    constructor() {
        super('testjoin', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildMemberAdd', message.member);
    }
}