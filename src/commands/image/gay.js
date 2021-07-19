const BaseCommand = require("../../utils/structures/BaseCommand")

module.exports = class Gay extends BaseCommand {
    constructor() {
        super("gay", "image", [])
    }

    async run(client, message) {
        const mentionedMember = message.mentions.members.first() || message.author
        let link = `https://some-random-api.ml/canvas/gay/?avatar=https://cdn.discordapp.com/avatars/${mentionedMember.id}/${mentionedMember.avatar || mentionedMember.user.avatar}.png`

        message.reply({ content: link })
    }
}