const { MessageEmbed } = require("discord.js");
const muteSchema = require("../../schemas/mute-schema");
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

        let muteDocEmbed = new MessageEmbed()
            .setDescription(`Unmuted ${mentionedMember} ${reason ? `for **${reason}**` : ""}`)
            .setColor("LUMINOUS_VIVID_PINK");

        message.reply({ embeds: [muteDocEmbed] });
    }
};