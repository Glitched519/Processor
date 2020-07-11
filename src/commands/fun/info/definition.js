module.exports = {
    run: async(client, message, args) => {
        if (args.startsWith("$def")) return;
        message.channel.send("https://www.vocabulary.com/dictionary/"+args);
    }, 
    aliases: ['def', 'define'],
    description: 'Shows the definition of a word'
}