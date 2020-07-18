const ytdl = require('ytdl-core');
const search = require('youtube-search');
const discord = require('discord.js');
const opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_TOKEN,
    type: 'video'
};

let queue = [];
let songIndex = 0;
module.exports = {
    run: async (client, message, args) => {
        let results = await search(args, opts).catch(err => console.log(err));
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(":x: Join a voice channel to play music.");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(":x: I don't have permissions to connect to the voice channel.");
        if (!permissions.has('SPEAK')) return message.channel.send(":x: I don't have permissions to speak in the voice channel.")

        function playNextSong() {
            songIndex++;
            console.log(songIndex);
            message.channel.send({
                embed: songEmbed
            });
            connection.play(ytdl(queue[songIndex]))
                .on('finish', () => {
                    if (songIndex + 1 < queue.length) {
                        playNextSong();
                    }
                })
                .on('error', err => {
                    dispatcher.setVolumeLogarithmic(5 / 5)
                })
        }

        let songEmbed = {
            title: "Now Playing ",
            description: '',
            color: `RANDOM`,
            // fields: [
            //     {
            //         name: 'Publish Date',
            //         value: result.publishedAt,
            //         inline: true,
            //     },
            //     {
            //         name: 'Channel',
            //         value: result.channelTitle,
            //         inline: true,
            //     },
            // ],
            timestamp: new Date()
        }

        try {
            var connection = await voiceChannel.join()
        } catch (err) {
            console.log(`There was an error connecting to the voice channel: ${err}`);
            return message.channel.send(`There was an error connecting to the voice channel: ${err}`);
        }

            if(results) {
                let youtubeResults = results.results;
                let titles = youtubeResults.map(result => {
                    result.title + "\n" + result.link;
                    queue.push(result.link);
                    console.log(result.link);
                    console.log(queue);
                    songEmbed.title += result.title;
                    songEmbed.description = result.link;
                    message.channel.send({
                        embed: songEmbed
                    });
                    const dispatcher = connection.play(ytdl(queue[songIndex]))
                    .on('finish', () => {
                        if (songIndex + 1 < queue.length) {
                            playNextSong();
                        }
                    })
                });
        }

    },
    aliases: ['p'],
    description: 'Plays a song'
}