const play = require('./play');

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to stop this music.**");
        message.member.voice.channel.leave();
        return undefined;
    }, 
    aliases: [],
    description: 'Stops the music playing'
}