const logsSchema = require('../../schemas/antispam-schema');
const mongo = require('../../features/mongo');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SetAntiSpam extends BaseCommand {
    constructor() {
        super('antispam', 'setup', ['nospam']);
    }

    async run(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send('You need the `Manage Server` permission to set an antispam channel.');
        }
        await mongo().then(async mongoose => {
                const guildId = message.guild.id;
                const antiSpamChannel = message.mentions.channels.first() || message.channel;

                await logsSchema.findOneAndUpdate({
                    guildId,
                    channelId: antiSpamChannel,
                }, {
                    guildId,
                    channelId: antiSpamChannel,
                }, {
                    upsert: true
                });

                message.reply(`${antiSpamChannel} now disallows any incoming spam messages from other members.`);
        });
    }
}