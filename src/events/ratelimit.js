const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class message extends BaseEvent {
    constructor() {
        super('ratelimit');
    }

    async run(client) {
        console.log(`Rate limit hit.`);
    }
}