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
            if (err)  {
                console.log(err);
                await interaction.editReply({ 
                    content: err,
                    ephemeral: true
                });
            }
    

        }
    }
};