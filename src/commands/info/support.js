const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Support extends BaseCommand {
    constructor() {
        super('support', 'info', []);
    }

    run(client, message, args) {
        let inviteEmbed = {
            color: `RANDOM`,
            title: 'Need Special Help? Join My Support Server!',
            description: ':arrow_right: [Support Server!](https://discord.gg/UNmdd8V) :arrow_left:',
            timestamp: new Date()
        }
        message.channel.send({ embed: inviteEmbed });
    }
}