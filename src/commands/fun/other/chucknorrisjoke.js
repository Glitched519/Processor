const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args) => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(res => res.json())
            .then(json => {
                message.channel.send(json.value);
            });
    },
    aliases: ['chuck', 'chuckjoke', 'norrisjoke', 'cjoke'],
    description: 'Shows a random Chuck Norris joke'
}

