const axios = require("axios").default;
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Hug extends BaseCommand {
    constructor() {
        super('hug', 'cute', []);
    }

    async run(client, message, args) {

        const options = {
            method: 'GET',
            url: 'https://some-random-api.ml/animu/hug',
        };

        axios.request(options).then(response => {
            let hugEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> hugs ${args}! Wholesome :blue_heart:**`)
                .setColor(`RANDOM`)
                .setImage(response.data.link)
            if (!args[0]) hugEmbed.setDescription(`**<@!${message.author.id}> hugs himself?**`);
            return message.channel.send({ embeds: [hugEmbed] });
        }).catch(() => {
            return message.channel.send({ content: ":x: Unfortunately, something went wrong with the API, and you could not hug your love :cry:." });
        });
    }
}