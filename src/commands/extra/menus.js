module.exports = {
    run: async(client, message, args) => {
        let usageEmbed = {
            title: "More Free Mod Menus",
            url: "https://syslx.net/free-menus.html",
            color: `RANDOM`,
            timestamp: new Date(),
        }   
        if (args.toLowerCase() == 'es') {
            usageEmbed.title = "Más Menús Mod Gratuitos";
        }
        else if (args.toLowerCase() == 'ge') {
            usageEmbed.title = "Weitere Kostenlose Mod-Menüs";
        }
        else {
            usageEmbed.title = "More Free Mod Menus";
        }
        message.channel.send({embed: usageEmbed});
        },
    aliases: ['free'],
    description: 'Free mod menus link by syslgame'
}