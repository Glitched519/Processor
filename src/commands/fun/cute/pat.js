const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        let memberTag = args.split(" ")[0];

        api.animu.pat().then(res => {
            let patEmbed = {
                description: `**${message.author.username} pats ${memberTag}!**`,
                description: `${memberTag}!`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            return message.channel.send({embed: patEmbed});
        });
    },
    aliases: [],
    description: 'Pats a member'
}