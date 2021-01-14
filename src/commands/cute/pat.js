const { api } = require("some-random-api");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Pat extends BaseCommand {
    constructor() {
        super('pat', 'cute', []);
    }

    run(client, message, args) {
        api.animu.pat().then(res => {
            let patEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> pats ${args}! Wholesome :blue_heart:**`)
                .setColor(`RANDOM`)
                .setImage(res.link)
                .setTimestamp()
            if (!args[0]) patEmbed.setDescription(`**<@!${message.author.id}> pats himself?**`);
            return message.channel.send(patEmbed);
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not pat your love :cry:.");
        });
    }
}