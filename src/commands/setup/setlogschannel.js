/* eslint-disable no-unused-vars */
const logsSchema = require("../../schemas/logs-schema")
const mongo = require("../../features/mongo")
const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class SetLogsChannel extends BaseCommand {
    constructor() {
        super("setlogschannel", "setup", ["logchannel"])
    }

    async run(client, message) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ content: "You need the `Manage Server` permission to set or change the logging channel." })
        }
        const antiSpamChannel = message.mentions.channels.first() || message.channel

        await mongo().then(async mongoose => {
            const guildId = message.guild.id
            const logChannel = message.mentions.channels.first() || message.channel

            await logsSchema.findOneAndUpdate({
                _id: guildId
            }, {
                _id: guildId,
                channel: logChannel
            }, {
                upsert: true
            })

            message.reply({ content: `the log channel is now ${logChannel}` })
        })
    }
}