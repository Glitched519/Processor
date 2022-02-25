const userReg = RegExp(/<@!?(\d+)>/);
const logSchema = require("../../schemas/logs-schema");
const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Ban extends BaseCommand {
    constructor() {
        super("ban", "mod", ["b"]);
    }

    async run(client, message, args) {
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null);

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply({ content: "You need the `Ban Members` permission to ban a member." });
        }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            return message.reply({ content: "I need the `Ban Members` permission to ban a member." });
        }
        if (!mentionedUser) {
            return message.reply({ content: "You need to mention a member you want to ban." });
        }

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id);

        if (mentionedMember == null) {
            return message.reply("Member does not exist, or was previously banned.");
        }

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position;
            const memberPosition = message.member.roles.highest.position;
            const botPosition = message.guild.me.roles.highest.position;

            if (memberPosition <= mentionedPosition) {
                return message.reply({ content: "Cannot ban this member as their role is higher or equal to yours." });
            }
            else if (botPosition <= mentionedPosition) {
                return message.reply({ content: "Cannot ban this member as their role is higher or equal to mine." });
            }
        }

        args.shift();
        const reason = args.join(" ");

        let banDMEmbed = new MessageEmbed()
        .setTitle(`You have been banned from ${message.guild.name}`)
        .addField("Reason", reason ? reason : "No reason given.")
        .setColor("DARK_RED")
        .setTimestamp();

        mentionedMember.send({ embeds: [banDMEmbed] }).catch(() => message.reply("They have been banned. But since their DMs are off, I cannot DM them."));

        message.guild.members.ban(mentionedUser.id, { reason: reason }).catch(() => message.reply("They have been banned. But since their DMs are off, I cannot DM them."));

        let banEmbed = new MessageEmbed()
            .setDescription(`Banned ${mentionedUser} ${reason ? `for **${reason}**` : ""}`)
            .setColor("DARK_RED")
            .setTimestamp();
        message.reply({ embeds: [banEmbed] });

        const logChannelQuery = await logSchema.findOne({ _id: message.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        let banLogEmbed = new MessageEmbed()
            .setTitle("Member Banned Permanently")
            .setDescription(`${mentionedMember} banned since <t:${Math.floor(Date.now() / 1000)}:R>`)
            .setColor("DARK_RED")
            .addField("Banned by", `<@${message.author.id}>`)
            .addField("Reason", reason ? reason : "No reason given.")
            .setTimestamp();

        destination.send({ embeds: [banLogEmbed] });
    }
};