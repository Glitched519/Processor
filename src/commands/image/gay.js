const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Gay extends BaseCommand {
    constructor() {
        super('gay', 'image', [])
    }

    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let link = mentionedMember ? `https://some-random-api.ml/canvas/gay/?avatar=${mentionedMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 })}` : `https://some-random-api.ml/canvas/gay/?avatar=${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`

        message.channel.send({ content: link })
    }
}