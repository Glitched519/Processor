const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class IdKick extends BaseCommand {
    constructor() {
        super('idkick', 'mod', ['hackkick', 'ikick', 'kickid', 'idkick']);
    }

    async run(client, message, args) {
        let memberId = args.shift();
        let reason = args.join(' ');

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(":x: **I need the `Kick Members` permission to kick a member.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(":x: **You need the `Kick Members` permission to kick a member.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        else {
            let member = message.guild.members.cache.get(memberId);
            if (member) {
                try {
                    await member.kick(reason);
                    if (reason == '') reason = "No reason provided.";
                    if (!memberId) return message.channel.send(":x: **Member not found.**")
                        .then(msg => {
                            msg.delete({ timeout: 4000 });
                        });
                    let kickEmbed = {
                        title: ":boot: Member Kicked :boot: ",
                        description: `**Member: **<@!${memberId}>\n**Reason: **${reason}`,
                        color: "#fc6203",
                        timestamp: new Date()
                    }
                    message.channel.send({ embed: kickEmbed });
                }
                catch (err) {
                    return message.reply(":x: **Not possible to kick this member.**")
                        .then(msg => {
                            msg.delete({ timeout: 4000 });
                        });
                }
            }
        }
    }
}