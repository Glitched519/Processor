const { MessageEmbed } = require('discord.js');
const warnSchema = require('../../schemas/warn-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Unwarn extends BaseCommand {
    constructor() {
        super('unwarn', 'mod', ['unw', 'uw']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let cannotUnwarnEmbed = new MessageEmbed()
            .setDescription(`That member is a bot. I cannot unwarn them.`)
            .setColor('AQUA')
        if (mentionedMember.user.bot) return message.channel.send({ embeds: [cannotUnwarnEmbed] });

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({ content: 'You need to `Message Messages` permission to unwarn a member.' });
        }

        if (!mentionedMember) {
            return message.channel.send({ content: 'You need to mention a member you want to warn' });
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.channel.send({ content: "You can't unwarn this member as their role is higher than or equal to yours." });
        }

        const reason = args.slice(2).join(' ')

        const warnDoc = await warnSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
        }).catch(err => console.log(err));

        if (!warnDoc || !warnDoc.warnings.length) {
            return message.channel.send({ content: "This member has a clean slate!" });
        }

        const warningId = parseInt(args[1])

        if (warningId < 0 || warningId > warnDoc.warnings.length) {
            return message.channel.send({ content: 'Invalid warning ID.' });
        }

        warnDoc.warnings.splice(warningId - 1, warningId !== 1 ? warningId - 1 : 1);
        await warnDoc.save().catch(err => console.log(err));

        let unwarnEmbed = new MessageEmbed()
            .setDescription(`Unwarned ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
            .setColor('DARK_GOLD')

        message.channel.send({ embeds: [unwarnEmbed] });
    }
}