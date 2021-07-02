const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class TestJoin extends BaseCommand {
    constructor() {
        super('testjoin', 'setup', []);
    }

    async run(client, message) {
        if (message.author.id !== '749985510889619576') return;

        client.emit('guildMemberAdd', message.member);
    }
}