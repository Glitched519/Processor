const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.animu.wink().then(res => {
            let winkEmbed = {
                title: `${message.author.username} winks at someone!`,
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
    description: 'Winks at a person'
}