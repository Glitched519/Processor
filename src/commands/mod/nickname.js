const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Nickname extends BaseCommand {
    constructor() {
        super('nickname', 'mod', ['nick', 'name']);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
            return message.channel.send('You need the `Manage Nicknames` permission to change the nickname a member.');
        }
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
            return message.channel.send('I need the `Manage Nicknames` permission to change the nickname of a member.');
        }
        if (!mentionedMember) {
            return message.channel.send('You need to mention a member whose nickname you want to change.');
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.channel.send('Cannot change their nickname as their role is higher than or equal to yours.');
        }
        else if (botPosition <= mentionedPosition) {
            return message.channel.send('Cannot their nickname as their role is higher than or equal to mine.');
        }

        args.shift();
        const nickname = args.join(' ');

        nickname == '' ? 
        mentionedMember.setNickname(null) : 
        mentionedMember.setNickname(nickname)
        message.channel.send(new MessageEmbed()
            .setDescription(`${mentionedMember}'s nickname has been ${nickname == '' ? `reset.` : `changed to **${nickname}**.`}`)
            .setColor('GREEN')
        );
    }
}