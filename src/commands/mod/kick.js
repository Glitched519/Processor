const userReg = RegExp(/<@!?(\d+)>/);
const logSchema = require("../../schemas/logs-schema");
const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Kick extends BaseCommand {
    constructor() {
        super("kick", "mod", ["k"]);
    }

    async run(client, message, args) {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null);
       
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply({ content: "You need the `Kick Members` permission to kick a member." });
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            return message.reply({ content: "I need the `Kick Members` permission to kick a member." });
        }
        if (!mentionedUser) {
            return message.reply({ content: "You need to mention a member you want to kick." });
        }
        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

        if (mentionedMember == null) {
            return message.reply("Member does not exist, or was previously kicked.");
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

            let kickEmbed = new MessageEmbed()
                .setDescription(`Kicked ${mentionedMember} ${reason ? `for **${reason}**` : ""}`)
                .setColor("ORANGE")
                .setTimestamp();

            message.reply({ embeds: [kickEmbed] });

            let kickDMEmbed = new MessageEmbed()
            .setTitle(`You have been kicked from ${message.guild.name}`)
            .addField("Reason", reason ? reason : "No reason given.")
            .setColor("ORANGE")
            .setTimestamp();

            mentionedMember.send({ embeds: [kickDMEmbed] }).catch(() => message.reply("They have been banned. But since their DMs are off, I cannot DM them."));

            message.guild.members.kick(mentionedUser.id, { reason: reason }).catch(() => message.reply("They have been banned. But since their DMs are off, I cannot DM them."));

        const logChannelQuery = await logSchema.findOne({ _id: message.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        let kickLogEmbed = new MessageEmbed()
            .setTitle("Member Kicked")
            .setDescription(`${mentionedMember} kicked since <t:${Math.floor(Date.now() / 1000)}:R>`)
            .setColor("ORANGE")
            .addField("Kicked by", `<@${message.author.id}>`)
            .addField("Reason", reason ? reason : "No reason given.")
            .setTimestamp();

        destination.send({ embeds: [kickLogEmbed] });
    }
};