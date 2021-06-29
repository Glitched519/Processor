const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class GuildMemberAdd extends BaseEvent {
    constructor() {
        super('interaction');
    }
    async run(client, interaction) {
        switch (interaction.customID) {
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
                console.log(interaction.customID);
        }
    }
}