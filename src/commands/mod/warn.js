const warnSchema = require('../../schemas/warn-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Warn extends BaseCommand {
    constructor() {
        super('warn', 'mod', ['w']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send("You need the `Manage Messages` permission to warn a member.");
        }
        if (!mentionedMember) {
            return message.channel.send('You need to mention member you want to warn.');
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.channel.send("You can't warn this member as their role is higher than or equal to yours.");
        }

        const reason = args.slice(1).join(' ') || 'Not Specified';

        let warnDoc = await warnSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
        }).catch(err => console.log(err))

        if (!warnDoc) {
            warnDoc = new warnSchema({
                guildId: message.guild.id,
                memberId: mentionedMember.id,
                warnings: [reason],
                moderator: [message.member.id],
                date: [Date.now()],
            });
            await warnDoc.save().catch(err => console.log(err));
        }
        else {
            warnDoc.warnings.push(reason);
            warnDoc.moderator.push(message.member.id);
            warnDoc.date.push(Date.now());

            await warnDoc.save().catch(err => console.log(err));
        }

        message.channel.send(`Warned ${mentionedMember} for reason: **${reason}**`);
    }
}