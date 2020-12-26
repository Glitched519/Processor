const { api } = require("some-random-api");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Pat extends BaseCommand {
    constructor() {
        super('pat', 'cute', []);
    }

    run(client, message, args) {
        api.animu.pat().then(res => {
            let patEmbed = {
                description: `**<@!${message.author.id}> pats ${args}! Wholesome :blue_heart:**`,
                color: `RANDOM`,
                image: {
                    url: res.link
                },
                timestamp: new Date()
            }
            if (!args[0]) patEmbed.description = `**<@!${message.author.id}> pats himself?**`;
            return message.channel.send({ embed: patEmbed });
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not pat your love :cry:.");
        });
    }
}