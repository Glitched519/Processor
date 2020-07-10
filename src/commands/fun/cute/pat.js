const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.animu.pat().then(res => {
            let patEmbed = {
                title: `${message.author.username} pats someone!`,
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
    description: 'Pats a person'
}