const { MessageEmbed } = require("discord.js");
const muteSchema = require("../../schemas/mute-schema");
const logSchema = require("../../schemas/logs-schema");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Unmute extends BaseCommand {
    constructor() {
        super("unmute", "mod", ["unm", "um"]);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ");
        const muteRole = message.guild.roles.cache.find(r => r.name == "Muted");

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.reply({ content: "You need the `Manage Roles` permission to unmute a member." });
        }

        if (!mentionedMember) {
            return message.reply({ content: "You need to mention a member you want to unmute." });
        }

        if (!muteRole) {
            return message.reply({ content: "This server has no `Muted` role. Please mute a member to create this role." });
        }

        if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.reply({ content: "Cannot unmute this member as their role is higher than or equal to mine." });
        }

        if (muteRole.position >= message.guild.me.roles.highest.position) {
            return message.reply({ content: "Cannot unmute members as the Muted role is higher than or equal to mine." });
        }

        const muteDoc = await muteSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
        });

        if (mentionedMember.roles.cache.has(muteRole.id) && !muteDoc) {
            mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
            return message.reply({ content: `Unmuted ${mentionedMember} ${reason ? `for **${reason}**` : ""}` });
        }

        if (!muteDoc) {
            return message.reply({ content: "This member is not muted." });
        }

        mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));

        for (const role of muteDoc.memberRoles) {
            mentionedMember.roles.add(role).catch(err => console.log(err));
        }

        await muteDoc.deleteOne();

        let unmuteDocEmbed = new MessageEmbed()
            .setDescription(`Unmuted ${mentionedMember} ${reason ? `for **${reason}**` : ""}`)
            .setColor("LUMINOUS_VIVID_PINK")
            .setTimestamp();

        let unmuteDMEmbed = new MessageEmbed()
            .setTitle(`You have been unmuted in ${message.guild.name}`)
            .addField("Reason", reason ? reason : "No reason given.")
            .setColor("LUMINOUS_VIVID_PINK")
            .setTimestamp();
    
            mentionedMember.send({ embeds: [unmuteDMEmbed] }).catch(() => message.reply("They have been unmuted. But since their DMs are off, I cannot DM them."));

        message.reply({ embeds: [unmuteDocEmbed] });

        let unmuteLogEmbed = new MessageEmbed()
        .setTitle("Member Unmuted")
        .setDescription(`${mentionedMember} unmuted since <t:${Math.floor(Date.now() / 1000)}:R>`)
        .setColor("LUMINOUS_VIVID_PINK")
        .addField("Unmuted by", `<@${message.author.id}>`)
        .addField("Reason", reason ? reason : "No reason given.")
        .setTimestamp();

        const logChannelQuery = await logSchema.findOne({ _id: message.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        destination.send({ embeds: [unmuteLogEmbed] });
    }
};