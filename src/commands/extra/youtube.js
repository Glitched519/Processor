module.exports = {
    run: async (client, message, args) => {
        let usageEmbed = {
            title: "syslgame",
            url: "https://www.youtube.com/syslgame",
            color: `#2a1da0`,
            thumbnail: {
                url: "https://res06.noxgroup.com/noxinfluencer/youtube/avatar/0ca0debfed1a548400815c0fc570c421.png"
            },
            description: "This is the official YouTube channel from <@!315122013276733442>.",
            timestamp: new Date(),
        }
        message.channel.send({
            embed: usageEmbed
        });
    },
    aliases: ['yt'],
    description: 'syslgame YouTube channel'
}