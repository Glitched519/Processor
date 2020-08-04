const fetch = require('node-fetch');
module.exports = {
    run: async(client, message, args) => {
        fetch('https://icanhazdadjoke.com/slack')
        .then(res => res.json())
        .then(json => {
            message.channel.send(json.attachments[0].text);
        });
    }, 
    aliases: ['dad', 'djoke'],
    description: 'Shows a random dad joke'
}
