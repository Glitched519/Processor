const { create, all } = require('mathjs');
const math = create(all);
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Calculate extends BaseCommand {
    constructor() {
        super('calculate', 'math', ['calc', 'c']);
    }

    async run(client, message, args) {
        try {
            let ans = math.evaluate(args.join(' '));
            message.channel.send('`' + math.format(ans, { precision: 16 }) + '`');
        }
        catch (err) {
            message.channel.send(`\`\`\`js\n${err}\`\`\``);
        }
    }
}