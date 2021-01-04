const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class message extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }
    async run(client, message) {
        
    }
}