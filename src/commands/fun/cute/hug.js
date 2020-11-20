const { api } = require("some-random-api");
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        api.animu.hug().then(res => {
            let hugEmbed = {
                description: `**<@!${message.author.id}> hugs ${args}! Wholesome :blue_heart:**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            if (args == `${PREFIX}hug`) hugEmbed.description = `**<@!${message.author.id}> hugs himself?**`;
            return message.channel.send({ embed: hugEmbed });
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not hug your love :cry:.");
        });
    },
    aliases: [],
    description: 'Hugs a member'
}