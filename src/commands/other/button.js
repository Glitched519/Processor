const { MessageButton } = require("discord-buttons");
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ChuckNorrisJoke extends BaseCommand {
    constructor() {
        super('button', 'other', ['btn']);
    }

    async run(client, message, args) {
        const button1 = new MessageButton()
            .setStyle('green')
            .setLabel('⏮')
            .setID('button1');

        const button2 = new MessageButton()
            .setStyle('url')
            .setLabel('Get')
            .setURL("https://discord-buttons.js.org");

        const button3 = new MessageButton()
            .setStyle('red')
            .setLabel('⏭')
            .setID('button3');

        message.channel.send('Click this button to get a response!', {
            buttons: [button1, button2, button3]
        });
    }
}