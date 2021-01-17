const userReg = RegExp(/<@!?(\d+)>/);
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Ban extends BaseCommand {
    constructor() {
        super('ban', 'mod', ['b']);
    }

    async run(client, message, args) {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null);

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('You need the `Ban Members` permission to ban a member.');
        }
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('I need the `Ban Members` permission to ban a member.');
        }
        if (!mentionedUser) {
            return message.channel.send('Mention a member whom you want to ban.');
        }

        const allBans = await message.guild.fetchBans();

        if (allBans.get(mentionedUser.id)) {
            return message.channel.send('This member has already been banned.');
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position;
            const memberPosition = message.member.roles.highest.position;
            const botPosition = message.guild.me.roles.highest.position;

            if (memberPosition <= mentionedPosition) {
                return message.channel.send('Cannot ban this member as their role is higher or equal to yours.');
            }
            else if (botPosition <= mentionedPosition) {
                return message.channel.send('Cannot ban this member as their role is higher or equal to mine.');
            }
        }

        const shaft = args.shift();
        const reason = args.join(' ');

        message.guild.members.ban(mentionedUser.id, { reason: reason });

        message.channel.send(`Banned ${mentionedUser} ${reason ? `for **${reason}**` : ''}`);
    }
}