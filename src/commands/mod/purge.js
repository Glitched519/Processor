const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class Purge extends BaseCommand {
    constructor() {
        super('purge', 'mod', ['clear', 'clean', 'delete', 'del']);
    }

    async run(client, message, args) {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(":x: **I need the `Manage Messages` permission to delete messages.**")
            .then(msg => {
                msg.delete({ timeout: 4000 });
            });
        }
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) {
            return message.channel.send(":x: **You need the `Manage Messages` permission to delete messages.**")
            .then(msg => {
                msg.delete({ timeout: 4000 });
            });
        }
        
        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 100) {
            return message.reply('You can only delete between 1 and 100 messages at once.')
            .then(msg => {
                msg.delete({ timeout: 4000 });
            });
        }

        let deleteAmount = parseInt(args[0]);
        let deleteEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`I have cleared ${deleteAmount} message(s).`)


        message.channel.bulkDelete(deleteAmount + 1, true);
        message.channel.send(deleteEmbed)
        .then(msg => {
            msg.delete({ timeout: 4000 });
        });
    }
}