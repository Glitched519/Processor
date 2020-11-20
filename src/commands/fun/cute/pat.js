const { api } = require("some-random-api");
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        api.animu.pat().then(res => {
            let patEmbed = {
                description: `**<@!${message.author.id}> pats ${args}! Aww :green_heart:**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            if (args == `${PREFIX}pat`) patEmbed.description = `**<@!${message.author.id}> pats himself?**`;
            return message.channel.send({ embed: patEmbed });
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not pat your love :cry:");
        });
    },
    aliases: [],
    description: 'Pats a member'
}