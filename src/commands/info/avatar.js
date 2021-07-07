const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Avatar extends BaseCommand {
    constructor() {
        super('avatar', 'info', ['pic', 'pfp', 'av'])
    }

    async run(client, message) {
        const mentionedMember = message.mentions.members.first() || message.author
        console.log(mentionedMember.avatar)
        let avatar = `https://cdn.discordapp.com/avatars/${mentionedMember.id}/${mentionedMember.avatar || mentionedMember.user.avatar}.png`

        message.channel.send({ content: avatar })
    }
}