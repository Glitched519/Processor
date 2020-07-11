module.exports = {
    run: async(client, message, args) => {
        const words = args.replace(/\s+/g,"_");
        message.channel.send("https://en.wikipedia.org/wiki/" + words);
    }, 
    aliases: ['wiki'],
    description: 'Loads a Wikipedia page of the given topic'
}