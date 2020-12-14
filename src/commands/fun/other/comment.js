const config = require('../../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        args = args.replace(/ /g, "%20");
        message.channel.send(`https://some-random-api.ml/canvas/youtube-comment?avatar=https://cdn.discordapp.com/avatars/${message.member.user.id}/${message.member.user.avatar}&comment=${args}&username=${message.author.username}`);
    },
    aliases: [],
    description: 'Generates a fake YouTube comment'
}

