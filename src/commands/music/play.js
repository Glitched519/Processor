const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api");

let queue = [];
let songIndex = 0;
module.exports = {
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send(":x: You need to be in a voice channel to play music.");
        const permissions = voiceChannel.permissionsFor(message.client.user); 
            if(!permissions.has('CONNECT')) return message.channel.send(":x: I don't have permissions to connect to the voice channel.");
            if(!permissions.has('SPEAK')) return message.channel.send(":x: I don't have permissions to speak in the voice channel.")

            function playNextSong() {
                    songIndex++;
                    console.log(songIndex);
                    message.channel.send({embed: songEmbed});
                    connection.play(ytdl(queue[songIndex]))
                    .on('finish', () => {
                        if (songIndex+1 < queue.length) {
                            playNextSong();
                        }
                    })
                    .on('error', err => {
                        dispatcher.setVolumeLogarithmic(5 / 5)
                    })
            }

            function endQueue() {
                console.log("End of queue.");
                voiceChannel.leave();
            }
            
            try {
                var connection = await voiceChannel.join()
            }
            catch(err) {
                console.log(`There was an error connecting to the voice channel: ${err}`);
                return message.channel.send(`There was an error connecting to the voice channel: ${err}`);
            }
            queue.push(args);
            console.log(args);
            console.log(queue);
            let songEmbed = {
                title: "Now Playing",
                description: queue[songIndex],
                color: `RANDOM`
            }
            if(queue.length == 1) {
                message.channel.send({embed: songEmbed});
                const dispatcher = connection.play(ytdl(queue[songIndex]))
            }
            else {
                message.channel.send({embed: songEmbed});
                    connection.play(ytdl(queue[songIndex]))
                    .on('finish', () => {
                        playNextSong();
                    })
                    .on('error', err => {
                        dispatcher.setVolumeLogarithmic(5 / 5)
                    })
            }
            
    }, 
    aliases: ['p'],
    description: 'Plays a song'
}   