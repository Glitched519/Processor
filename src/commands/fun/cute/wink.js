const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        let memberTag = args.split(" ")[0];

        api.animu.wink().then(res => {
            let winkEmbed = {
                description: `**${message.author.username} winks at ${memberTag}!**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            return message.channel.send({embed: winkEmbed});
        });
    },
    aliases: [],
    description: 'Winks at a member'
}