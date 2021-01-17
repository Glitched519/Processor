const warnSchema = require('../../schemas/warn-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Warnings extends BaseCommand {
    constructor() {
        super('warnings', 'mod', ['warns']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const warnDoc = await warnSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
        }).catch(err => console.log(err));

        if (!warnDoc || !warnDoc.warnings.length) {
            return message.channel.send(`${mentionedMember} has a clean slate!`);
        }

        const data = [];

        for (let i = 0; i < warnDoc.warnings.length; i++) {
            data.push(`**ID: ${i + 1}`);
            data.push(`**Warn:** ${warnDoc.warnings[i]}`)
            data.push(`**Moderator:** ${await message.client.users.fetch(warnDoc.moderator[i]).catch(() => 'Deleted User')}`);
            data.push(`**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`);
        }

        const embed = {
            color: 'BLUE', 
            thumbnail: {
                url: mentionedMember.user.displayAvatarURL({ dynammic: true }),
            },
            description: data.join('\n'),
        }

        message.channel.send({ embed: embed });
    }
}