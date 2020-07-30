const ytdl = require('ytdl-core');
const search = require('youtube-search');
const discord = require('discord.js');
const opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_TOKEN,
    type: 'audio'
};

let servers = [];
let songIndex = 0;
module.exports = {
    run: async (client, message, args) => {
        let results = await search(args, opts).catch(err => console.log(err));
        const voiceChannel = message.member.voice.channel;
        try {
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                message.channel.send(":x: **I don't have permissions to connect to the voice channel.**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
                return;
            }
            if (!permissions.has('SPEAK')) {
                message.channel.send(":x: **I don't have permissions to speak in the voice channel.**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
                return;
            }
        }
        catch (err) {
            message.channel.send(':x: **I may not have proper permissions set to connect or play music in a channel.**')
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args);

        function playNextSong() { 
            let server = servers[message.guild.id];
            
            server.dispatcher = connection.play(ytdl(server.queue[songIndex], {filter: "audioonly"}));
            server.queue.shift();

            server.dispatcher.on('finish', () => {
                if (songIndex + 1 < server.queue.length) {
                    playNextSong();
                }
                else {
                    connection.disconnect();
                }
                songIndex++;
            })
        }

        let songEmbed = {
            author: "Now Playing ",
            title: '',
            url: '',
            color: `RANDOM`,
            timestamp: new Date(),
            fields : [
                {
                    name: 'Published Date',
                    value: '',
                    inline: true
                },
                {
                    name: 'Owner',
                    value: '',
                    inline: true
                }
            ]
        }

        try {
            var connection = await voiceChannel.join()
        } catch (err) {
            console.log(`There was an error connecting to the voice channel: ${err}`);
            return message.channel.send(`**There was an error connecting to the voice channel: ${err}**`);
        }

        if(results) {
            let youtubeResults = results.results;
            let titles = youtubeResults.map(result => {
                result.title + "\n" + result.link;
                server.queue.push(result.link);
                server.queue.shift();
                message.channel.send(`:musical_note: **Now Playing ${result.title} :musical_note:**`)
                const dispatcher = connection.play(ytdl(server.queue[songIndex])
                .on('info', (info) => {
                    songEmbed.title = info.videoDetails.title;
                    songEmbed.url = info.videoDetails.video_url;
                    songEmbed.fields[0].value = info.videoDetails.publishDate;
                    songEmbed.fields[1].value = info.videoDetails.ownerChannelName;
                    message.channel.send({embed: songEmbed});
                }))
                .on('finish', () => {
                    if (songIndex + 1 < queue.length) {
                        playNextSong();
                    }
                })
            });
        }

        playNextSong();      
    },
    aliases: ['p'],
    description: 'Plays a song'
}