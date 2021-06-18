const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class Ready extends BaseEvent {
    constructor() {
        super('interaction');
    }
    async run(client) {
        if (!interaction.isButton()) return;
	    console.log(interaction);

        if (interaction.commandName === 'point') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomID('primary')
                        .setLabel('primary')
                        .setStyle('PRIMARY'),
                );
    
            await interaction.reply({ content: 'There!', components: [row] });
        }
    }
}