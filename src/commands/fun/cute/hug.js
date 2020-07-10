const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.animu.hug().then(res => {
            let hugEmbed = {
                title: `${message.author.username} hugs someone!`,
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
    description: 'Hugs a person'
}