const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.other.base64Encode(args).then(res => {        
            message.channel.send('`'+res.base64+'`');
        });
    }, 
    aliases: ['b64'],
    description: 'Converts number to base64'
}