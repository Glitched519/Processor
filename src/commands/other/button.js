const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = class Button extends BaseCommand {
    constructor() {
        super("button", "other", ["btn"]);
    }

    async run(client, message, args) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomID("Click")
                    .setLabel("Click Me!")
                    .setStyle("PRIMARY"),
            );

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Oh Look!")
            .setURL("https://processorbot.xyz/")
            .setDescription("A button! What does it do?");

        await message.channel.send({ content: "Hi there!", ephemeral: true, embeds: [embed], components: [row] });
    }
}