const PREFIX = process.env.PREFIX;

module.exports = {
    
    run: async(client, message, args) => {
        if (args.startsWith(`${PREFIX}def`)) return;
        message.channel.send("https://www.vocabulary.com/dictionary/"+args);
    }, 
    aliases: ['def', 'define'],
    description: 'Shows the definition of a word'
}