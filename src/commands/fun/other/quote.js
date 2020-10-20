const fetch = require('node-fetch');
module.exports = {
    run: async (client, message, args) => {
        fetch('https://api.quotable.io/random')
            .then(res => res.json())
            .then(json => {
                message.channel.send(`> ${json.content}\n${json.author}`)
            });
    },
    aliases: [],
    description: 'Shows a random quote'
}