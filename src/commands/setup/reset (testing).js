/* eslint-disable no-unused-vars */
const antiSpamSchema = require('../../schemas/antispam-schema')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')
const logsSchema = require('../../schemas/logs-schema')
const mongo = require('../../features/mongo')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Reset extends BaseCommand {
    constructor() {
        super('reset', 'setup', [])
    }

    async run(client, message) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ content: 'You need the `Manage Server` permission to reset the server settings.' })
        }

        message.reply({ content: ":warning: Are you sure you want to reset the server configuration?" })
            .then(async msg => {
                msg.react('788157429106868235')
                    .then(msg.react('788157446178340915'))

                const filter = (reaction, user) => {
                    return ['yes', 'no'].includes(reaction.emoji.name) && user.id === message.author.id
                }
                msg.awaitReactions(filter, { max: 1, time: 20000, errors: ['time'] })
                    .then(async collected => {
                        const reaction = collected.first()

                        switch (reaction.emoji.name) {
                            case 'yes':
                                await mongo().then(async mongoose => {
                                    const guildId = message.guild.id

                                    const prefix = await commandPrefixSchema.findOneAndDelete({
                                        _id: guildId
                                    })
                                })
                                message.reply({ content: `Configuration reset.` })
                                break
                            case 'no':
                                return message.reply({ content: 'Reset Cancelled.' })
                        }
                    })
                    .catch(() => {
                        return message.reply({ content: `Timed out after 20 seconds.` })
                    })
            })
    }
}