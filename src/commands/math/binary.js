const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        if (args.startsWith(`${PREFIX}bin`)) return;
        message.channel.send('`' + Number(args).toString(2).toUpperCase() + '`');
    },
    aliases: ['bin'],
    description: 'Converts number to binary'
}