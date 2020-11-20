module.exports = {
    run: async (client, message, args) => {
        let firstMember = args.split(' ');
        if (!message.guild.me.hasPermission(['MANAGE_NICKNAMES'])) {
            return message.channel.send(":x: **I need the `Manage Nicknames` permission to change a member's nickname.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
            }
        if (!message.member.hasPermission(['MANAGE_NICKNAMES'])) {
            return message.channel.send(":x: **You need the `Manage Nicknames` permission to change a member's nickname.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        const newNickname = args.substring(args.indexOf(' ') + 1);
        if (args.endsWith(">")) {
            return message.channel.send(":grey_question: **You need to specify a nickname to give to this member.**");
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(firstMember[0]);
        if (!firstMember[1]) {
            return message.channel.send(":grey_question: **You need to specify a nickname to give to this member.**");
        }
        if (!member) {
            return message.channel.send(":x: **You need to specify an existing member.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }

        member.setNickname(newNickname)
        .catch(err => {
            message.channel.send(":x: **Cannot change nickname. The member has a higher role than me.**");
        })
    },
    aliases: ['nick', 'name'],
    description: 'Changes the nickname of a user'
}