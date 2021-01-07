const config = require('../../config.json');
const PREFIX = config['bot-prefix'];
const fs = require('fs');
const emojis = require('../../emojis.json');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Poll extends BaseCommand {
    constructor() {
        super('poll', 'info', []);
    }

    async run(client, message, args) {
        // if (args.length == 0) return;
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(":x: You must have `Manage Messages` permission to run this command.")
        }

        const addReactions = message => {
            message.react('👍')
            setTimeout(() => {
                message.react('👎');
            }, 500)
        }

        if (message.guild.me.hasPermission('MANAGE_MESSAGES')) await message.delete();
        const fetched = await message.channel.messages.fetch({ limit: 1 })
        if (fetched && fetched.first()) {
            addReactions(fetched.first())
        }
    }
}