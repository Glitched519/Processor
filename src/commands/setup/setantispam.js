const logsSchema = require('../../schemas/antispam-schema')
const mongo = require('../../features/mongo')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class SetAntiSpam extends BaseCommand {
    constructor() {
        super('antispam', 'setup', ['nospam'])
    }

    async run(client, message) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ content: 'You need the `Manage Server` permission to set an antispam channel.' })
        }
        // eslint-disable-next-line no-unused-vars
        await mongo().then(async mongoose => {
            const guildId = message.guild.id
            const antiSpamChannel = message.mentions.channels.first() || message.channel

            await logsSchema.findOneAndUpdate({
                guildId,
                channelId: antiSpamChannel,
            }, {
                guildId,
                channelId: antiSpamChannel,
            }, {
                upsert: true
            })

            message.reply({ content: `${antiSpamChannel} now disallows any incoming spam messages from other members.` })
        })
    }
}