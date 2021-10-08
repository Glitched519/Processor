const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Kick extends BaseCommand {
    constructor() {
        super("kick", "mod", ["k"]);
    }

    async run(client, message, args) {
        // const target = message.mentions.members?.first || message.guild.members.cache.get(args[0]);
        // if (!message.member.permissions.has("KICK_MEMBERS")) {
        //     return message.reply({ content: "You need the `Kick Members` permission to kick a member." });
        // }

        // if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
        //     return message.reply({ content: "I need the `Kick Members` permission to kick a member." });
        // }

        // if (!target) {
        //     return message.reply({ content: "Please tag someone to kick." });
        // }

        // if (!target.kickable) {
        //     return message.reply({ content: "Cannot kick that user." });
        // }

        // args.shift();
        // const reason = args.join(" ");

        // target.kick(reason);

        // return message.reply({ content: `You kicked <@${target.id}>` });
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply({ content: "You need the `Kick Members` permission to kick a member." });
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.reply({ content: "I need the `Kick Members` permission to kick a member." });
        }
        if (!mentionedMember) {
            return message.reply({ content: "You need to mention a member you want to kick." });
        }

        const mentionedPosition = mentionedMember.roles.highest.position;
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;

        if (memberPosition <= mentionedPosition) {
            return message.reply({ content: "Cannot kick this member as their role is higher or equal to yours." });
        }
        else if (botPosition <= mentionedPosition) {
            return message.reply({ content: "Cannot kick this member as their role is higher or equal to mine." });
        }

        args.shift();
        const reason = args.join(" ");

        try {
            await mentionedMember.kick([reason]);
            let kickEmbed = new MessageEmbed()
                .setDescription(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ""}`)
                .setColor("ORANGE");
            message.reply({ embeds: [kickEmbed] });
        }
        catch (err) {
            message.reply({ content: "Failed to kick this member: " + err });
        }
    }
};