const { create, all } = require('mathjs');
const math = create(all);

module.exports = {
    run: async (client, message, args) => {
        try {
            message.channel.send('`' + math.evaluate(args) + '`');
        }
        catch (err) {
            message.channel.send(`:x: **${err}**`);
        }

    },
    aliases: ['calc', 'c'],
    description: 'Calculates an expression'
}