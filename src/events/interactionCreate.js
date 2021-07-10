const BaseEvent = require('../utils/structures/BaseEvent')

module.exports = class InteractionCreate extends BaseEvent {
    constructor() {
        super('interactionCreate')
    }
    async run(client, interaction) {
        switch (interaction.customId) {
            case "Blurple":
                interaction.reply({ content: "Blurple", ephemeral: true })
                break
            case "Grey":
                interaction.reply({ content: "Grey", ephemeral: true })
                break
            case "Green":
                interaction.reply({ content: "Green", ephemeral: true })
                break
            case "Red":
                interaction.reply({ content: "Red", ephemeral: true })
                break
            default:
                return
        }
    }
}