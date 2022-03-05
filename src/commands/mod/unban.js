const userReg = RegExp(/<@!?(\d+)>/);
const logSchema = require("../../schemas/logs-schema");
const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Unban extends BaseCommand {
    constructor() {
        super("unban", "mod", ["ub", "unb"]);
    }

    async run(client, message, args) {
        const userId = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
        const mentionedUser = await message.client.users.fetch(userId).catch(() => null);

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.reply({ content: "You need the `Ban Members` permission to unban a member." });
        }
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            return message.reply({ content: "I need the `Ban Members` permission to unban a member." });
        }
        if (!mentionedUser) {
            return message.reply({ content: "You need to mention a user to unban." });
        }

        const reason = args.slice(1).join(" ");

        message.guild.members.unban(mentionedUser.id, [reason]).catch(err => {
            return message.reply({ content: "Failed to unban this member: " + err });
        });

        let unbanEmbed = new MessageEmbed()
            .setDescription(`Unbanned ${mentionedUser} ${reason ? `for **${reason}**` : ""}`)
            .setColor("DARK_BLUE")
            .setTimestamp();
        message.reply({ embeds: [unbanEmbed] });

        let unbanLogEmbed = new MessageEmbed()
        .setTitle("Member Unbanned")
        .setDescription(`${mentionedUser} unbanned since <t:${Math.floor(Date.now() / 1000)}:R>`)
        .setColor("DARK_BLUE")
        .addField("Unbanned by", `<@${message.author.id}>`)
        .addField("Reason", reason ? reason : "No reason given.")
        .setTimestamp();

        const logChannelQuery = await logSchema.findOne({ _id: message.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        destination.send({ embeds: [unbanLogEmbed] });
    }
};