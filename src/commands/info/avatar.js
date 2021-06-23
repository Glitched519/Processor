const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Avatar extends BaseCommand {
    constructor() {
        super('avatar', 'info', ['pic', 'pfp', 'av']);
    }

    async run(client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let avatar = member ? member.user.displayAvatarURL({ dynamic: true }) : message.author.displayAvatarURL({ dynamic: true });

        message.channel.send({ content: avatar })
    }
}