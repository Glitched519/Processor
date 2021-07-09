const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Support extends BaseCommand {
    constructor() {
        super('support', 'info', [])
    }

    async run(client, message) {
        let inviteEmbed = new MessageEmbed()
            .setTitle('Need Some Help? Join My Support Server!')
            .setColor('#FF77DD')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(':arrow_right: [Support Server!](https://discord.gg/UNmdd8V) :arrow_left:')

        message.reply({ embeds: [inviteEmbed] })
    }
}