const { api } = require("some-random-api");

module.exports = {
    run: async(client, message, args) => {
        api.other.binaryEncode(args).then(res => {        
            message.channel.send('`'+res.binary+'`');
        });
    }, 
    aliases: ['bin', 'b'],
    description: 'Converts number to binary'
}