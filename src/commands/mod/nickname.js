const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Nickname extends BaseCommand {
    constructor() {
        super("nickname", "mod", ["nick", "name"]);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
            return message.reply({ content: "You need the `Manage Nicknames` permission to change the nickname a member." });
        }
        if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) {
            return message.reply({ content: "I need the `Manage Nicknames` permission to change the nickname of a member." });
        }
        if (!mentionedMember) {
            return message.reply({ content: "You need to mention a member whose nickname you want to change." });
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.reply({ content: "Cannot change their nickname as their role is higher than or equal to yours." });
        }
        else if (botPosition <= mentionedPosition) {
            return message.reply({ content: "Cannot their nickname as their role is higher than or equal to mine." });
        }

        args.shift();
        const nickname = args.join(" ");

        nickname == "" ?
            mentionedMember.setNickname(null) :
            mentionedMember.setNickname(nickname);

        let nicknameEmbed = new MessageEmbed()
            .setDescription(`${mentionedMember}"s nickname has been ${nickname == "" ? "reset." : `changed to **${nickname}**.`}`)
            .setColor("GREEN");

        message.reply({ embeds: [nicknameEmbed] });
    }
};