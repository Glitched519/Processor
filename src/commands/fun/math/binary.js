const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        if (args.startsWith(`${PREFIX}bin`)) return;
        message.channel.send('`' + Number(args).toString(2).toUpperCase() + '`');
    },
    aliases: ['bin'],
    description: 'Converts number to binary'
}