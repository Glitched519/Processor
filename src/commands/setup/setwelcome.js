const welcomeSchema = require('../../schemas/welcome-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

const cache = new Map();

const loadData = async () => {
    const results = await welcomeSchema.find()

    for (const result of results) {
        cache.set(result._id, result.channel);
    }
}
loadData();

module.exports = class SetSuggestionChannel extends BaseCommand {
    constructor() {
        super('setwelcome', 'mod', []);
    }

    async run(client, message, args) {
        if (!message.member.hasPermission('MANAGE_SERVER')) {
            return message.channel.send(':x: You need the `Manage Channels` permission to set a suggestion channel.')
        }
        const guildId = message.guild.id;
        const welcomeChannel = message.mentions.channels.first() || message.channel;

        await welcomeSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channel: welcomeChannel
        }, {
            upsert: true
        });

        cache.set(guildId, welcomeChannel);

        message.reply(`Welcome channel set as ${welcomeChannel}.`);
    }
}

module.exports.getChannelId = (guildId) => {
    return cache.get(guildId);
}