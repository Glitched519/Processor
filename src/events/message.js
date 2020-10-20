const ms = require('ms');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const { Util } = require('discord.js');
const PREFIX = process.env.PREFIX;

const youtube = new YouTube(process.env.YOUTUBE_TOKEN)

const opts = {
	maxResults: 1,
	key: process.env.YOUTUBE_TOKEN,
	type: 'audio'
};

const queue = new Map();

module.exports = async (client, message) => {
	client.user.setActivity(`${client.users.cache.size} members`, { type: 'WATCHING' }).catch(console.error);
	if (message.content.includes("<@&735270562544222290>")) {
		message.reply("you are about to ping all staff in the server. **Unless it's an emergency**, you will be punished for pinging this role. Reply with `call` **IN CAPS within 10 seconds** if you want to do this.");
		const filter = m => m.content.includes('CALL');
		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				message.reply(`you have chosen to <@&701441802087170138>. Staff will come to address your issue urgently.`);
			})
			.catch(collected => {
				message.reply("time's up! Your staff call was declined.");
			});
	}

	if (message.author.bot) return;

	if (message.content == '<@!689678745782714464>') {
		return message.reply(`hi! My prefix is **${PREFIX}**. You can summon my help page using **${PREFIX}help**.`)
	}
	let bannedWords = fs.readFileSync('./events/bannedwords.txt').toString().split("\r\n");
	let bannedPhrases = fs.readFileSync('./events/bannedphrases.txt').toString().split("\r\n");
	let msg = message.content.toLowerCase();
	let wordsOnlyMsg = msg.replace(/[.?!#$%^&*,-_+=]/g, ' ');
	let words = wordsOnlyMsg.split(/\s+/);
	for (let i = 0; i < bannedWords.length; i++) {
		if (words.includes(bannedWords[i])) {
			//message.delete();
			// return message.reply(`you are not allowed to say that word anywhere in ${message.guild.name}.`)
			// .then(msg => {
			//     msg.delete({timeout: 10000});
			// });
		}
	}
	for (let i = 0; i < bannedPhrases.length; i++) {
		if (msg.includes(bannedPhrases[i])) {
			// message.delete();
			// return message.reply(`you are not allowed to say that phrase anywhere in ${message.guild.name}.`)
			// .then(msg => {
			//     msg.delete({timeout: 10000});
			// });
		}
	}

	if (message.author.bot) return;

	const args = message.content.substring(PREFIX.length).split(" ");
	const searchString = args.slice(1)
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${PREFIX}play`)) {

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to play music.**")
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send(":x: **I don't have the connect permission to connect to the voice channel.**")
		if (!permissions.has('SPEAK')) return message.channel.send(":x: **I don't have the speak permission to speak in the voice channel.**")

		try {
			var video = await youtube.getVideoByID(url);
		}
		catch {
			try {
				var videos = await youtube.searchVideos(searchString, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			}
			catch (err) {
				return message.channel.send("**No results found.**");
			}
		}

		const song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		}

		if (!serverQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
				loop: false,
			}
			queue.set(message.guild.id, queueConstruct);

			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(message.guild, queueConstruct.songs[0]);
			}
			catch (err) {
				queue.delete(message.guild.id);
				console.log(err);
				return message.channel.send(`:x: **There was an error connecting to the voice channel:** ${err}`)
			}
		}
		else {
			serverQueue.songs.push(song);
			return message.channel.send(`Added **${song.title}** to the queue.`);
		}
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}stop`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to stop this music.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		serverQueue.songs = []
		serverQueue.connection.dispatcher.end();
		message.channel.send(":stop_button: **Stopped.**");
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}skip`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to skip songs.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		serverQueue.connection.dispatcher.end();
		message.channel.send(":track_next: **Skipped.**");
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}volume`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to change the volume.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		if (!args[1]) return message.channel.send(`The volume is: **${serverQueue.volume}**`);
		if (isNaN(args[1])) return message.channel.send(":x: **Invalid amount.**");
		if (args[1] > 5 || args[1] < 0) return message.channel.send(":x: **Volume must be between 0 and 5.**");
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		message.channel.send(`Volume set to **${args[1]}**.`);
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}np`)) {
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**.`);
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}queue`)) {
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		message.channel.send(`
__**Song Queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}		
		
**Now Playing:** ${serverQueue.songs[0].title}
		`, { split: true });
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}pause`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to pause songs.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		if (!serverQueue.playing) return message.channel.send("The music is already paused.");
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.channel.send(":pause_button: **Paused.**");
		return undefined;
	}
	else if (message.content.startsWith(`${PREFIX}resume`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to resume songs.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");
		if (serverQueue.playing) return message.channel.send("The music is already playing.");
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		message.channel.send(":arrow_forward: **Resumed.**");
	}
	else if (message.content.startsWith(`${PREFIX}loop`)) {
		if (!message.member.voice.channel) return message.channel.send(":x: **You need to be in a voice channel to loop songs.**");
		if (!serverQueue) return message.channel.send("There is nothing playing.");

		serverQueue.loop = !serverQueue.loop;

		return message.channel.send(`:repeat_one: **Loop ${serverQueue.loop ? `Enabled**` : `Disabled**`}.`)
	}

	async function play(guild, song) {
		const info = await ytdl.getInfo(song.url);
		const serverQueue = queue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}

		const dispatcher = serverQueue.connection.play(ytdl(song.url, {
			filter: 'audioonly',
			quality: 'highestaudio',
			highWaterMark: 1 << 25
		}))
			.on('finish', () => {
				if (!serverQueue.loop) serverQueue.songs.shift();
				play(guild, serverQueue.songs[0]);
			})
			.on('error', error => {
				console.log(error)
			})
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		let songEmbed = {
			author: "Now Playing ",
			title: '',
			url: '',
			color: `RANDOM`,
			timestamp: new Date(),
			fields: [{
				name: 'Publish Date',
				value: '',
				inline: true
			},
			{
				name: 'Owner',
				value: '',
				inline: true
			},
			{
				name: 'Views',
				value: '',
				inline: true
			},
			{
				name: 'Duration',
				value: '',
				inline: true
			},
			{
				name: ':thumbsup: Likes',
				value: '',
				inline: true
			},
			{
				name: ':thumbsdown: Dislikes',
				value: '',
				inline: true
			}
			]
		}
		serverQueue.textChannel.send(`Start Playing: **${song.title}**`);
		songEmbed.title = song.title;
		songEmbed.url = song.url;
		songEmbed.fields[0].value = info.videoDetails.publishDate;
		songEmbed.fields[1].value = info.videoDetails.ownerChannelName;
		songEmbed.fields[2].value = info.videoDetails.viewCount;
		(info.videoDetails.lengthSeconds % 60) < 10 ?
			songEmbed.fields[3].value = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:0${info.videoDetails.lengthSeconds % 60}` :
			songEmbed.fields[3].value = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${info.videoDetails.lengthSeconds % 60}`;
		songEmbed.fields[4].value = info.videoDetails.likes;
		songEmbed.fields[5].value = info.videoDetails.dislikes;
		serverQueue.textChannel.send({
			embed: songEmbed
		});
	}

	let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();
	let argsToParse = message.content.substring(message.content.indexOf(' ') + 1);

	if (client.commands.get(cmdName)) {
		client.commands.get(cmdName)(client, message, argsToParse);
	}
	else {
		// message.reply(':x: **Please enter a valid command.**')
		// .then(msg => {
		// 	msg.delete({timeout: 4000});
		// 	setTimeout(function() {
		// 		msg.edit(':information_source: **Try running ' + `**${PREFIX}help**` + ' for all commands.**');
		// 	  }, 1500)
		// }).catch(console.error);
	}
}