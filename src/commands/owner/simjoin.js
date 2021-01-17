const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SetSuggestionChannel extends BaseCommand {
    constructor() {
        super('simjoin', 'setup', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '638064155965915187') return;

        client.emit('guildMemberAdd', message.member);
    }
}