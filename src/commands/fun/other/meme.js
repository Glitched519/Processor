const fetch = require('node-fetch');

module.exports = {
    run: async(client, message, args) => {
        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {
            if (!message.channel.nsfw) {
                if (json.nsfw) return message.channel.send("Sorry, this meme was not sent due to NSFW content.");
            }
            let memeEmbed = {
                title: json.title,
                url: json.postLink,
                description: `[${json.author}](https://www.reddit.com/u/${json.author})`, 
                color: `RANDOM`,
                image: {
                    url: json.url
                },
                footer: {
                    text: `👍 ${json.ups} | ${json.subreddit}`  
                }
            }
            return message.channel.send({embed: memeEmbed});
        });
    }, 
    aliases: ['haha', 'funny', 'lol'],
    description: 'Shows a random meme'
}