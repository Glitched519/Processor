const config = require('../config.json');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const { Util } = require('discord.js');
const PREFIX = config["bot-prefix"];

const youtube = new YouTube(config["youtube-token"])

const queue = new Map();

module.exports = async (client, message) => {
	if (message.author.bot) return;

	if (message.channel.type === 'news') message.crosspost();

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
	// MUSIC COMMANDS
	// const args = message.content.substring(PREFIX.length).split(" ");
	// const searchString = args.slice(1)
	// const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	// const serverQueue = queue.get(message.guild.id);
	// const voiceChannel = message.member.voice.channel;

	// if (message.content.startsWith(`${PREFIX}play `) || message.content.startsWith(`${PREFIX}p `)) {
	// 	if (!message.channel.nsfw) {
	// 		for (let i = 0; i < bannedWords.length; i++) {
	// 			if (message.content.includes(bannedWords[i])) return message.channel.send("This song contains NSFW lyrics. Please visit an NSFW channel to play this song.");
	// 		}

	// 		for (let j = 0; j < bannedPhrases.length; j++) {
	// 			if (message.content.includes(bannedPhrases[j])) return message.channel.send("This song contains NSFW lyrics. Please visit an NSFW channel to play this song.");
	// 		}
	// 	}

	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to play music.**")
	// 	const permissions = voiceChannel.permissionsFor(message.client.user);
	// 	if (!permissions.has('CONNECT')) return message.channel.send(":x: **I need the `Connect` permission to connect to the voice channel.**")
	// 	if (!permissions.has('SPEAK')) return message.channel.send(":x: **I need the `Speak` permission to speak in the voice channel.**")
	// 	voiceChannel.join();
	// 	try {
	// 		var video = await youtube.getVideoByID(url);
	// 	}
	// 	catch {
	// 		try {
	// 			var videos = await youtube.searchVideos(searchString, 1);
	// 			var video = await youtube.getVideoByID(videos[0].id);
	// 		}
	// 		catch (err) {
	// 			return message.channel.send("**No results found.**");
	// 		}
	// 	}

	// 	const song = {
	// 		id: video.id,
	// 		title: Util.escapeMarkdown(video.title),
	// 		url: `https://www.youtube.com/watch?v=${video.id}`
	// 	}

	// 	if (!serverQueue) {
	// 		const queueConstruct = {
	// 			textChannel: message.channel,
	// 			voiceChannel: voiceChannel,
	// 			connection: null,
	// 			songs: [],
	// 			volume: 100,
	// 			playing: true,
	// 			loop: false,
	// 		}
	// 		queue.set(message.guild.id, queueConstruct);

	// 		queueConstruct.songs.push(song);

	// 		try {
	// 			var connection = await voiceChannel.join();
	// 			queueConstruct.connection = connection;
	// 			play(message.guild, queueConstruct.songs[0]);
	// 		}
	// 		catch (err) {
	// 			queue.delete(message.guild.id);
	// 			return message.channel.send(`:x: **There was an error connecting to the voice channel:** ${err}`)
	// 		}
	// 	}
	// 	else {
	// 		serverQueue.songs.push(song);
	// 		if (serverQueue.songs.length > 1) message.channel.send(`Queued **${song.title}** at #${serverQueue.songs.length - 1}.`);
	// 		if (serverQueue.songs.length == 1) play(message.guild, serverQueue.songs[0]);
	// 	}
	// 	return undefined;
	// }
	// else if (message.content.startsWith(`${PREFIX}stop`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to stop this music.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");
	// 	try {
	// 		serverQueue.connection.dispatcher.destroy();
	// 	}
	// 	catch (err) {
	// 		return message.channel.send("There is nothing playing.");
	// 	}
	// 	serverQueue.songs = [];
	// 	return message.channel.send(":stop_button: **Stopped.**");
	// }
	// else if (message.content.startsWith(`${PREFIX}skip`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (serverQueue && serverQueue.songs.length <= 1) return message.channel.send(":x: **There are no queued tracks left.**")
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to skip songs.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");
	// 	try {
	// 		serverQueue.connection.dispatcher.end();
	// 	}
	// 	catch (err) {
	// 		return message.channel.send("There is nothing playing.");
	// 	}
	// 	message.channel.send(":track_next: **Skipped.**");
	// 	return undefined;
	// }
	// else if (message.content.startsWith(`${PREFIX}volume `) || message.content.startsWith(`${PREFIX}vol `)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to change the volume.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");
	// 	if (!args[1]) return message.channel.send(`The volume is: **${serverQueue.volume}**`);
	// 	if (isNaN(args[1])) return message.channel.send(":x: **Invalid amount.**");
	// 	if (args[1] > 100 || args[1] < 0) return message.channel.send(":x: **Volume must be between 0 and 100.**");
	// 	serverQueue.volume = args[1];
	// 	try {
	// 		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
	// 	}
	// 	catch (err) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	message.channel.send(`Volume set to **${args[1]}**.`);
	// 	return undefined;
	// }
	// else if (message.content.startsWith(`${PREFIX}queue`) || message.content.startsWith(`${PREFIX}q`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to view the queue.**");
	// 	if (!serverQueue || serverQueue.songs.length == 0) return message.channel.send("There is nothing playing.");
	// 	let queueEmbed = {
	// 		title: "Song Queue",
	// 		color: `RANDOM`,
	// 		description: `
	// 			${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}		
	// 			**Now Playing:** ${serverQueue.songs[0].title}`,
	// 	}
	// 	message.channel.send({ embed: queueEmbed });
	// 	return undefined;
	// }
	// else if (message.content.startsWith(`${PREFIX}pause`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to pause songs.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");
	// 	if (!serverQueue.playing) return message.channel.send("The music is already paused.");
	// 	serverQueue.playing = false;
	// 	try {
	// 		serverQueue.connection.dispatcher.pause();
	// 	}
	// 	catch (err) {
	// 		return message.channel.send(":x: **Cannot pause.**")
	// 	}
	// 	message.channel.send(":pause_button: **Paused.**");
	// 	return undefined;
	// }
	// else if (message.content.startsWith(`${PREFIX}resume`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to resume songs.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");
	// 	if (serverQueue.playing) return message.channel.send("The music is already playing.");
	// 	serverQueue.playing = true;
	// 	try {
	// 		serverQueue.connection.dispatcher.resume();
	// 	}
	// 	catch (err) {
	// 		return message.channel.send(":x: **Cannot resume.**")
	// 	}
	// 	message.channel.send(":arrow_forward: **Resumed.**");
	// }
	// else if (message.content.startsWith(`${PREFIX}loop`)) {
	// 	if (!client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) {
	// 		return message.channel.send(":x: **I am not connected to a voice channel right now.**");
	// 	}
	// 	if (!voiceChannel) return message.channel.send(":x: **You need to be in a voice channel to loop songs.**");
	// 	if (!serverQueue) return message.channel.send("There is nothing playing.");

	// 	serverQueue.loop = !serverQueue.loop;

	// 	return message.channel.send(`:repeat_one: **Loop ${serverQueue.loop ? `Enabled**` : `Disabled**`}.`)
	// }

	// async function play(guild, song) {
	// 	const serverQueue = queue.get(guild.id)
	// 	const info = await ytdl.getInfo(song.url)
	// 		.catch(err => {
	// 			serverQueue.songs = [];
	// 			return message.channel.send(`:x: **${err}. Please try again.**`);
	// 		});

	// 	//guild.voice.setDeaf(true);

	// 	const dispatcher = serverQueue.connection.play(ytdl(song.url, {
	// 		filter: 'audioonly',
	// 		quality: 'highestaudio',
	// 		highWaterMark: 1 << 25
	// 	}))
	// 		.on('finish', () => {
	// 			if (!serverQueue.loop) serverQueue.songs.shift();
	// 			if (serverQueue.songs.length != 0) play(guild, serverQueue.songs[0]);
	// 		})
	// 		.on('error', error => {
	// 			message.channel.send(":x: **Sorry, an unknown error occurred. Please try again.**")
	// 				.then(msg => {
	// 					msg.delete({
	// 						timeout: 10000
	// 					});
	// 				});
	// 		});

	// 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
	// 	let songEmbed = {
	// 		author: "Now Playing ",
	// 		title: '',
	// 		url: '',
	// 		color: `RANDOM`,
	// 		thumbnail: {
	// 			url: ''
	// 		},
	// 		timestamp: new Date(),
	// 		fields: [{
	// 			name: ':calendar: Publish Date',
	// 			value: '',
	// 			inline: true
	// 		},
	// 		{
	// 			name: ':crown: Owner',
	// 			value: '',
	// 			inline: true
	// 		},
	// 		{
	// 			name: ':eyes: Views',
	// 			value: '',
	// 			inline: true
	// 		},
	// 		{
	// 			name: ':clock1: Duration',
	// 			value: '',
	// 			inline: true
	// 		},
	// 		]
	// 	}
	// 	songEmbed.title = song.title;
	// 	songEmbed.url = song.url;
	// 	songEmbed.thumbnail.url = info.videoDetails.thumbnail.thumbnails[0].url;
	// 	songEmbed.fields[0].value = info.videoDetails.publishDate;
	// 	songEmbed.fields[1].value = info.videoDetails.ownerChannelName;
	// 	songEmbed.fields[2].value = info.videoDetails.viewCount;
	// 	(info.videoDetails.lengthSeconds % 60) < 10 ?
	// 		songEmbed.fields[3].value = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:0${info.videoDetails.lengthSeconds % 60}` :
	// 		songEmbed.fields[3].value = `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${info.videoDetails.lengthSeconds % 60}`;
	// 	if (!serverQueue.loop) serverQueue.textChannel.send(`:arrow_forward: **Now Playing**`, {
	// 		embed: songEmbed
	// 	});
	// 	if (serverQueue.songs.length == 0) return voiceChannel.leave();
	// }
	let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();
	let argsToParse = message.content.substring(message.content.indexOf(' ') + 1);

	if (client.commands.get(cmdName.toLowerCase()) && message.content.startsWith(`${PREFIX}`)) {
		if (!message.guild.me.hasPermission("EMBED_LINKS")) {
			return message.channel.send(":grey_question: The majority of my commands use embeds. Please enable the **Embed Links** permission for me.");
		}
		client.commands.get(cmdName.toLowerCase())(client, message, argsToParse);
	}
}