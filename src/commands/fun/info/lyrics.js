const { api } = require("some-random-api");
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        if(args ==  `${PREFIX}lyrics`) {
            message.delete();
            message.reply(":memo: **What song's lyrics do you want?**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
            return;
        }
        else {
            api.other.lyrics(args).then(res => {        
                let lyricsEmbed = {
                    title: `${res.title} by ${res.author}`,
                    color: `RANDOM`,
                    description: res.links.genius,
                    timestamp: new Date()
                }
                return message.channel.send({embed: lyricsEmbed});
            });
        }
    }, 
    aliases: ['lyric'],
    description: 'Shows the name and a link to the song lyrics'
}