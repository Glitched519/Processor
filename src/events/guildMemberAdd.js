const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class GuildMemberAdd extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }
    async run(client, message) {
        
    }
}