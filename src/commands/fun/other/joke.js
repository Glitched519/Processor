const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args) => {
        fetch('https://official-joke-api.appspot.com/random_joke')
            .then(res => res.json())
            .then(json => {
                message.channel.send(`${json.setup}\n||${json.punchline}||`);
            });
    },
    aliases: [],
    description: 'Shows a random joke'
}