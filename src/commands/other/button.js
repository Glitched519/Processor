const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = class Button extends BaseCommand {
    constructor() {
        super("button", "other", ["btn"]);
    }

    async run(client, message) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Blurple")
                    .setCustomID("Blurple")
                    .setStyle("PRIMARY"),
                    new MessageButton()
                    .setLabel("Grey")
                    .setCustomID("Grey")
                    .setStyle("SECONDARY"),
                    new MessageButton()
                    .setLabel("Green")
                    .setCustomID("Green")
                    .setStyle("SUCCESS"),
                    new MessageButton()
                    .setLabel("Red")
                    .setCustomID("Red")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setLabel("Click Me!")
                    .setURL("https://processorbot.xyz/")
                    .setStyle("LINK"),
                
            );

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Oh Look!")
            .setURL("https://processorbot.xyz/")
            .setDescription("Buttons! What do they do?");

        await message.channel.send({ content: "Hi there!", embeds: [embed], components: [row] });
    }
}