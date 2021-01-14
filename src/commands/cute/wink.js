const { api } = require("some-random-api");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Wink extends BaseCommand {
    constructor() {
        super('wink', 'cute', []);
    }

    run(client, message, args) {
        api.animu.wink().then(res => {
            let winkEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> winks at ${args}! Wholesome :blue_heart:**`)
                .setColor(`RANDOM`)
                .setImage(res.link)
                .setTimestamp()
            if (!args[0]) winkEmbed.setDescription(`**<@!${message.author.id}> winks at himself?**`);
            return message.channel.send(winkEmbed);
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not wink at your love :cry:");
        });
    }
}