const config = require('../../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        if (args.startsWith(`${PREFIX}hex`)) return;
        message.channel.send('`' + Number(args).toString(16).toUpperCase() + '`');
    },
    aliases: ['hex', 'base16', 'b16'],
    description: 'Converts number to hexadecimal'
}