const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Comment extends BaseCommand {
    constructor() {
        super('comment', 'other', [])
    }

    async run(client, message, args) {
        let sentence = args.join(' ')
        sentence = sentence.replace(/ /g, "%20")
        message.reply({ content: `https://some-random-api.ml/canvas/youtube-comment?avatar=https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}&comment=${sentence}&username=${message.author.username}` })
    }
}