const BaseCommand = require("../../utils/structures/BaseCommand")
const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")

module.exports = class Button extends BaseCommand {
    constructor() {
        super("button", "other", ["btn"])
    }

    async run(client, message) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Blurple")
                    .setCustomId("Blurple")
                    .setStyle("PRIMARY"),
                    new MessageButton()
                    .setLabel("Grey")
                    .setCustomId("Grey")
                    .setStyle("SECONDARY"),
                    new MessageButton()
                    .setLabel("Green")
                    .setCustomId("Green")
                    .setStyle("SUCCESS"),
                    new MessageButton()
                    .setLabel("Red")
                    .setCustomId("Red")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setLabel("Click Me!")
                    .setURL("https://processorbot.xyz/")
                    .setStyle("LINK"),
                
            )

        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Oh Look!")
            .setURL("https://processorbot.xyz/")
            .setDescription("Buttons! What do they do?")

        await message.reply({ content: "Hi there!", embeds: [embed], components: [row] })
    }
}