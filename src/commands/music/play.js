const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api");

module.exports = {
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to play music.**");
        const permissions = voiceChannel.permissionsFor(message.client.user); 
            if(!permissions.has('CONNECT')) return message.channel.send(":x: **I don't have permissions to connect to the voice channel.**");
            if(!permissions.has('SPEAK')) return message.channel.send(":x: **I don't have permissions to speak in the voice channel.**")

            try {
                var connection = await voiceChannel.join()
            }
            catch(err) {
                console.log(`There was an error connecting to the voice channel: ${err}`);
                return message.channel.send(`There was an error connecting to the voice channel: ${err}`);
            }
            const dispatcher = connection.play(ytdl(args))
            .on('finish', () => {
                voiceChannel.leave();
            })
            .on('error', err => {
                dispatcher.setVolumeLogarithmic(5 / 5)
            })
    }, 
    aliases: ['p'],
    description: 'Plays a song'
}