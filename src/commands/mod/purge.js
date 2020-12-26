const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Purge extends BaseCommand {
    constructor() {
        super('purge', 'mod', ['clear', 'clean', 'delete', 'del']);
    }

    run(client, message, args) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(":x: **I need the `Manage Messages` permission to delete messages.**")
        }
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
            return message.channel.send(":x: **You need the `Manage Messages` permission to delete messages.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        else {
            const deleteCount = parseInt(args);

            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply(":x: **You can only clear between 2 and 100 messages.**")
                    .then(msg => {
                        msg.delete({ timeout: 4000 });
                    });
            message.channel.bulkDelete(deleteCount)
                .catch(error => message.channel.send(`:x: **Failed to delete messages: ${error}**`));
        }
    }
}