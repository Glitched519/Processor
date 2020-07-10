module.exports = {
    run: async(client, message, args) => {
        if (args.includes('#')) {
            args = args.slice(1);
        }
        message.channel.send("https://www.clashofstats.com/players/" + args);
        
    }, 
    aliases: ['player', 'findplayer', 'playerfind'],
    description: 'Finds the player stats via Clash of Stats'
}