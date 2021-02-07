const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SimLeave extends BaseCommand {
    constructor() {
        super('simleave', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildMemberRemove', message.member);
    }
}