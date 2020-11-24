const config = require('../../../config.json');
const PREFIX = config["bot-prefix"];
const { inspect } = require('util');

module.exports = {
    run: async (client, message, args) => {
        if (message.author.id !== '638064155965915187') return;

        if (args.startsWith(`${PREFIX}e`)) return message.channel.send(":x: **Specify something to eval.**");

        try {
            const evaled = eval(args);

            let evalEmbed = {
                title: 'Evaluated',
                color: `RANDOM`,
                description: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``,
            }
            message.channel.send({ embed: evalEmbed });
        }
        catch (err) {
            let errEmbed = {
                title: 'Error',
                color: '#f08324',
                description: `\`\`\`js\n${err}\`\`\``,
            }
            message.channel.send({ embed: errEmbed });
        }
    },
    aliases: ['e'],
    description: 'Calculates an expression'
}