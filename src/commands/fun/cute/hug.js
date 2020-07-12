const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        let memberTag = args.split(" ")[0];

        api.animu.hug().then(res => {
            let hugEmbed = {
                description: `**${message.author.username} hugs ${memberTag}!**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            return message.channel.send({embed: hugEmbed});
        });
    },
    aliases: [],
    description: 'Hugs a member'
}