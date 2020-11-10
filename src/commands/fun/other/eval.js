const PREFIX = process.env.PREFIX;
const { inspect } = require('util');

module.exports = {
    run: async (client, message, args) => {
        if (message.author.id !== '638064155965915187') return message.channel.send(":x: **Only the bot owner (<@!638064155965915187>) can run this command.**")
            .then(msg => {
                msg.delete({ timeout: 4000 });
            });

        if (args.startsWith(`${PREFIX}e `)) return message.channel.send(":x: **Specify something to eval.**");

        try {
            const evaled = eval(args);

            let evalEmbed = {
                title: 'Evaluated',
                color: `RANDOM`,
                fields: [
                    {
                        name: 'To Eval',
                        value: `\`\`\`js\n${args}\`\`\``
                    },
                    {
                        name: 'Evaled',
                        value: `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``
                    },
                    {
                        name: 'Type Of',
                        value: `\`\`\`${typeof (evaled)}\`\`\``
                    }
                ],
                timestamp: new Date()
            }
            message.channel.send({ embed: evalEmbed });
        }
        catch (err) {
            let errEmbed = {
                title: 'Error',
                color: '#f08324',
                description: `${err}`,
                timestamp: new Date()
            }
            message.channel.send({ embed: errEmbed });
        }
    },
    aliases: ['e'],
    description: 'Calculates an expression'
}