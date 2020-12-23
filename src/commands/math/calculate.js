const { create, all } = require('mathjs');
const math = create(all);

module.exports = {
    run: async (client, message, args) => {
        try {
            let ans = math.evaluate(args);
            message.channel.send('`' + math.format(ans, {precision: 16}) + '`');
        }
        catch (err) {
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
        }

    },
    aliases: ['calc', 'c'],
    description: 'Calculates an expression'
}