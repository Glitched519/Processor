const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class ClickButton extends BaseEvent {
    constructor() {
        super('clickButton');
    }

    async run(client, button) {
        if (button.id === 'button1') {
            button.channel.send('Green!');
        } else if (button.id === 'button2'){
            button.channel.send("Red!");
        }
        button.defer();
    }

}