const ms = require("ms");

module.exports = {
    run: async(client, message, args) => {
        let msg = args.toLowerCase();
        if (msg.includes("token")) return;
        return message.channel.send('`'+eval(args)+'`');
    },  
    aliases: ['eval', 'calc', 'e', 'c'],
    description: 'Evaluates an expression'
}