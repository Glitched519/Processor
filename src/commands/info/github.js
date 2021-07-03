const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Github extends BaseCommand {
    constructor() {
        super('github', 'info', ['code', 'source'])
    }

    async run(client, message) {
        let codeEmbed = new MessageEmbed()
            .setColor(`#0F1111`)
            .setTitle("Here's All My Source Code!")
            .setThumbnail('https://www.sferalabs.cc/wp-content/uploads/github-logo-white.png')
            .setDescription(':arrow_right: [GitHub Link!](https://github.com/Glitched519/Processor) :arrow_left:')

        message.channel.send({ embeds: [codeEmbed] })
    }
}