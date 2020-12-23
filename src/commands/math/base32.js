const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        if (args.startsWith(`${PREFIX}b32`)) return;
        message.channel.send('`' + Number(args).toString(32).toUpperCase() + '`');
    },
    aliases: ['b32'],
    description: 'Converts number to base32'
}