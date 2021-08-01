const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class Purge extends BaseCommand {
    constructor() {
        super("purge", "mod", ["clear", "clean", "delete", "del"]);
    }

    async run(client, message, args) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.reply({ content: ":x: **I need the `Manage Messages` permission to delete messages.**" })
                .then(msg => {
                    setTimeout(() => msg.delete(), 4000);
                });
        }
        if (!message.member.permissions.has(["MANAGE_MESSAGES"])) {
            return message.reply({ content: ":x: **You need the `Manage Messages` permission to delete messages.**" })
                .then(msg => {
                    setTimeout(() => msg.delete(), 4000);
                });
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) {
            return message.reply({ content: "You can only delete between 1 and 100 messages at once." })
                .then(msg => {
                    setTimeout(() => msg.delete(), 4000);
                });
        }

        let deleteAmount = parseInt(args[0]);
        let deleteEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`I have cleared ${deleteAmount} message(s).`);


        deleteAmount == 100 ? message.channel.bulkDelete(deleteAmount, true) : message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply({ embeds: [deleteEmbed] })
            .then(msg => {
                setTimeout(() => msg.delete(), 4000);
            });
    }
};