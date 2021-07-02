const axios = require("axios").default;
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Pat extends BaseCommand {
    constructor() {
        super('pat', 'cute', []);
    }

    async run(client, message, args) {

        const options = {
            method: 'GET',
            url: 'https://some-random-api.ml/animu/pat',
        };

        axios.request(options).then(response => {
            let patEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> pats ${args}! Wholesome :blue_heart:**`)
                .setColor(`RANDOM`)
                .setImage(response.data.link)
            if (!args[0]) patEmbed.setDescription(`**<@!${message.author.id}> pats himself?**`);
            return message.channel.send({ embeds: [patEmbed] });
        }).catch(() => {
            return message.channel.send({ content: ":x: Unfortunately, something went wrong with the API, and you could not pat your love :cry:." });
        });
    }
}