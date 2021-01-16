const welcomeSchema = require('../../schemas/welcome-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

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

        message.reply(`Welcome channel set as ${welcomeChannel}.`);
    }
}