const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Kick extends BaseCommand {
    constructor() {
        super('kick', 'mod', ['k']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('You need the `Kick Members` permission to kick a member.');
        }
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('I need the `Kick Members` permission to kick a member.');
        }
        if (!mentionedMember) {
            return message.channel.send('Mention a member whom you want to kick.');
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.channel.send('Cannot kick this member as their role is higher or equal to yours.');
        }
        else if (botPosition <= mentionedPosition) {
            return message.channel.send('Cannot kick this member as their role is higher or equal to mine.');
        }

        const shaft = args.shift();
        const reason = args.join(' ');

        try {
            await mentionedMember.kick([reason]);
            message.channel.send(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ''}`);
        }
        catch (err) {
            message.channel.send('Failed to kick this member: ' + err);
        }
    }
}