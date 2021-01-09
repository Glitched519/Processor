const logsSchema = require('../../schemas/logs-schema');
const mongo = require('../../features/mongo');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SetLogsChannel extends BaseCommand {
    constructor() {
        super('logschannel', 'setup', ['logchannel']);
    }

    async run(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send('You need the `Manage Server` permission to set or change the logging channel.');
        }
        if (!args[0]) {
            return message.reply(`you need to state the log channel to send logs to.`);
        }
        await mongo().then(async mongoose => {
                const guildId = message.guild.id;
                const logChannel = message.mentions.channels.first() || message.channel;

                await logsSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    channel: logChannel
                }, {
                    upsert: true
                });

                message.reply(`the log channel is now ${logChannel}`);
        });
    }
}