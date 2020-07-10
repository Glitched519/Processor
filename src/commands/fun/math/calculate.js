module.exports = {
    run: async(client, message, args) => {
        message.channel.send('`'+eval(args)+'`');
    }, 
    aliases: ['eval', 'calc', 'e', 'c'],
    description: 'Converts number to base64'
}