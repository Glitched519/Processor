module.exports = {
    run: async(client, message, args) => {
        
            message.delete();
            message.channel.send(args);

            
        
    }, 
    aliases: ['say'],
    description: 'Makes the bot say something'
}