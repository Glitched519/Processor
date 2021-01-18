const { MessageEmbed } = require('discord.js');
const muteSchema = require('../../schemas/mute-schema');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Unmute extends BaseCommand {
    constructor() {
        super('unmute', 'mod', ['unm', 'um']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');
        const muteRole = message.guild.roles.cache.find(r => r.name == 'Muted');

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send('You need the `Manage Roles` permission to unmute a member.');
        }

        if (!mentionedMember) {
            return message.channel.send('You need to mention a member you want to unmute.');
        }

        if (!muteRole) {
            return message.channel.send('This server has no `Muted` role. Please mute a member to create this role.');
        }

        if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('Cannot unmute this member as their role is higher than or equal to mine.');
        }

        if (muteRole.position >= message.guild.me.roles.highest.position) {
            return message.channel.send('Cannot unmute members as the Muted role is higher than or equal to mine.');
        }

        const muteDoc = await muteSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
        });

        if (mentionedMember.roles.cache.has(muteRole.id) && !muteDoc) {
            mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
            return message.channel.send(`Unmuted ${mentionedMember} ${reason ? `for **${reason}**` : ''}`);
        }

        if (!muteDoc) {
            return message.channel.send('This member is not muted.');
        }

        mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));

        for (const role of muteDoc.memberRoles) {
            mentionedMember.roles.add(role).catch(err => console.log(err));
        }

        await muteDoc.deleteOne();

        message.channel.send(new MessageEmbed()
            .setDescription(`Unmuted ${mentionedMember} ${reason ? `for **${reason}**` : ''}`)
            .setColor('LUMINOUS_VIVID_PINK')
        );
    }
}