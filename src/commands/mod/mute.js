const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const muteSchema = require("../../schemas/mute-schema");
const BaseCommand = require("../../utils/structures/BaseCommand");
const logSchema = require("../../schemas/logs-schema");

module.exports = class Mute extends BaseCommand {
    constructor() {
        super("mute", "mod", ["m", "shut"]);
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const msRegex = RegExp(/(\d+(s|m|h|d|w))/);
        let muteRole = message.guild.roles.cache.find(r => r.name == "Muted");

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.reply({ content: "You need the `Manage Roles` permission to mute a member." });
        }
        if (!message.guild.me.permissions.has(["MANAGE_ROLES", "MANAGE_CHANNELS"])) {
            return message.reply({ content: "I need the `Manage Roles` and `Manage Channels` permissions to mute a member." });
        }
        if (!mentionedMember) {
            return message.reply({ content: "You need to mention a member you want to mute." });
        }
        if (!msRegex.test(args[1])) {
            return message.reply({ content: "Invalid mute time." });
        }
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                name: "Muted",
                reason: "Create role for muted members",
                color: "RED"
            }).catch(err => {
                return message.reply({ content: "Failed to create muted role: " + err });
            });
        }

        if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.reply({ content: "Cannot mute this member as their roles are higher or equal to mine." });
        }
        if (muteRole.position >= message.guild.me.roles.highest.position) {
            return message.reply({ content: "Cannot muted this member as the `Muted` role is higher than mine." });
        }
        if (ms(msRegex.exec(args[1])[1]) > 2592000000) {
            return message.reply({ content: "You can't mute a member for more than a month." });
        }

        const isMuted = await muteSchema.findOne({
            guildId: message.guild.id,
            memberId: mentionedMember.id
        });

        if (isMuted) {
            return message.reply({ content: "This member is already muted." });
        }

        const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== "@everyone");

        await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));

        for (const role of noEveryone) {
            await mentionedMember.roles.remove(role[0]).catch(err => console.log(err));
        }

        const muteDoc = new muteSchema({
            guildId: message.guild.id,
            memberId: mentionedMember.id,
            length: Date.now() + ms(msRegex.exec(args[1])[1]),
            memberRoles: noEveryone.map(r => r),
        });

        await muteDoc.save().catch(err => console.log(err));

        const reason = args.slice(2).join(" ");

        let muteEmbed = new MessageEmbed()
            .setDescription(`Muted ${mentionedMember} for **${msRegex.exec(args[1])[1]}** ${reason ? `for **${reason}**` : ""}`)
            .setColor("GREY")
            .setTimestamp();

        message.reply({ embeds: [muteEmbed] });

        let muteDMEmbed = new MessageEmbed()
        .setTitle(`You have been muted in ${message.guild.name}`)
        .addField("Reason", reason ? reason : "No reason given.")
        .addField("Expiration", `<t:${Math.floor(Date.now() / 1000 + ms(msRegex.exec(args[1])[1]) / 1000)}:R>`)
        .setColor("DARK_BLUE")
        .setTimestamp();

        mentionedMember.send({ embeds: [muteDMEmbed] }).catch(() => message.reply("They have been muted. But since their DMs are off, I cannot DM them."));

        let muteLogEmbed = new MessageEmbed()
        .setTitle("Member Muted")
        .setDescription(`${mentionedMember} muted since <t:${Math.floor(Date.now() / 1000)}:R>`)
        .setColor("DARK_BLUE")
        .addField("Muted by", `<@${message.author.id}>`)
        .addField("Reason", reason ? reason : "No reason given.")
        .addField("Expiration", `<t:${Math.floor(Date.now() / 1000 + ms(msRegex.exec(args[1])[1]) / 1000)}:R>`)
        .setTimestamp();

        const logChannelQuery = await logSchema.findOne({ _id: message.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        destination.send({ embeds: [muteLogEmbed] });
    }
};