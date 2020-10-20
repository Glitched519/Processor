const { api } = require("some-random-api");
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {

        api.animu.wink().then(res => {
            let winkEmbed = {
                description: `**<@!${message.author.id}> winks ${args}! :wink:**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            if (args == `${PREFIX}wink`) winkEmbed.description = `**<@!${message.author.id}> winks at himself?**`;
            return message.channel.send({ embed: winkEmbed });
        });
    },
    aliases: [],
    description: 'Winks at a member'
}