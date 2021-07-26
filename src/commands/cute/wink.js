const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Wink extends BaseCommand {
    constructor() {
        super("wink", "cute", []);
    }

    async run(client, message, args) {

        const options = {
            method: "GET",
            url: "https://some-random-api.ml/animu/wink",
        };

        axios.request(options).then(response => {
            let winkEmbed = new MessageEmbed()
                .setDescription(`**<@!${message.author.id}> winks at ${args}! Wholesome :blue_heart:**`)
                .setColor("RANDOM")
                .setImage(response.data.link);
            if (!args[0]) winkEmbed.setDescription(`**<@!${message.author.id}> winks at himself?**`);
            return message.reply({ embeds: [winkEmbed] });
        }).catch(() => {
            return message.reply({ content: ":x: Unfortunately, something went wrong with the API, and you could not wink your love :cry:." });
        });
    }
};