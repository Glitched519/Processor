const BaseEvent = require("../utils/structures/BaseEvent");

module.exports = class InteractionCreate extends BaseEvent {
    constructor() {
        super("interactionCreate");
    }
    async run(client, interaction) {

        const command = interaction.client.slashcommands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.run(interaction.client, interaction);
        } catch (err) {
            if (err) console.error(err);
    
            await interaction.reply({ 
                content: "An error occurred while executing this command.",
                ephemeral: true
            });
        }
    }
};