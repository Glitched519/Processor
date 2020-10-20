module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
            return message.channel.send(":x: **You need the `Manage Messages` permission to clear messages.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        else {
            const deleteCount = parseInt(args);

            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.channel.send(":x: **You can only clear between 2 and 100 messages.**")
                    .then(msg => {
                        msg.delete({ timeout: 4000 });
                    });

            message.channel.bulkDelete(deleteCount)
                .catch(error => message.channel.send(`:x: **Failed to delete messages: ${error}**`))
        }
    },
    aliases: ['clear', 'clean', 'delete', 'del'],
    description: 'Deletes a certain amount of messages'
}