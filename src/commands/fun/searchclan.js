module.exports = {
    run: async(client, message, args) => {
        if (args.includes('#')) {
            args = args.slice(1);
        }
        message.channel.send("https://www.clashofstats.com/clans/" + args);
        
    }, 
    aliases: ['clan', 'findclan', 'clanfind'],
    description: 'Finds the clan stats via Clash of Stats'
}