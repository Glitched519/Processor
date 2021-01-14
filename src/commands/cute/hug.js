const { api } = require("some-random-api");
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Hug extends BaseCommand {
    constructor() {
        super('hug', 'cute', []);
    }

    run(client, message, args) {
        api.animu.hug().then(res => {
            let hugEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> hugs ${args}! Wholesome :blue_heart:**`)
                .setColor(`RANDOM`)
                .setImage(res.link)
                .setTimestamp()
            if (!args[0]) hugEmbed.setDescription(`**<@!${message.author.id}> hugs himself?**`);
            return message.channel.send(hugEmbed);
        }).catch(err => {
            message.channel.send(":x: Unfortunately, something went wrong with the API, and you could not hug your love :cry:.");
        });
    }
}