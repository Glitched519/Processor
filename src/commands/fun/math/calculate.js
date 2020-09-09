module.exports = {
    run: async(client, message, args) => {
        if (args.includes("TOKEN")) return;
        message.channel.send('`'+eval(args)+'`');
    },  
    aliases: ['eval', 'calc', 'e', 'c'],
    description: 'Evaluates an expression'
}