const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Invite extends BaseCommand {
    constructor() {
        super('invite', 'info', ['botinvite']);
    }

    run(client, message, args) {
        let inviteEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('The More, The Merrier!')
            .setThumbnail('https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png')
            .setDescription(':arrow_right: [Invite Processor!](https://discord.com/oauth2/authorize?client_id=689678745782714464&scope=bot%20applications.commands&permissions=2134338815) :arrow_left:')

        message.channel.send({ embed: inviteEmbed });
    }
}