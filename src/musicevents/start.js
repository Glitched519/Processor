const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class TrackStartEvent extends BaseEvent {
    
    constructor() {
        super('trackStart');
    }

    async run(client, player, track) {
        player.textChannel.send(`Now playing: ${track.title}`);
    }
}