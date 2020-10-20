const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        if (args == `${PREFIX}warn`) {
            return message.channel.send(":x: **You need to specify a member to warn.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(":x: **You don't have permission to warn a member.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        let reason = args.slice(22);
        let memberTag = args.split(" ")[0];

        if (memberTag == `<@!${message.author.id}>`) {
            return message.channel.send(":grey_question: **Wait, why would you warn yourself?**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        else if (memberTag == `<@!689678745782714464>`) {
            return message.channel.send(":grey_question: **I don't think I can warn myself?**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }

        else if (!reason) {
            return message.channel.send(":grey_question: **What's the reason you're warning this member?**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }

        let warnEmbed = {
            title: ":warning: Member Warned :warning:",
            color: `#c4f942`,
            description: `**Member:** ${memberTag}\n**Reason: **${reason}`
        }
        message.channel.send({ embed: warnEmbed });
    },
    aliases: ['w'],
    description: 'Warns a user'
}  