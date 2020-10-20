module.exports = {
    run: async (client, message, args) => {
        let creditsEmbed = {
            title: "SYSLX Credits",
            url: "https://invite.gg/syslx",
            color: `#2a1da0`,
            thumbnail: {
                url: "https://syslx-menu.com/styles/syslxlogo.png"
            },
            fields: [{
                name: "**Menu Developer**",
                value: "<@!315122013276733442>"
            },
            {
                name: "**Launcher Developer**",
                value: "<@!472359202996748289>"
            },
            ],
            timestamp: new Date(),
        }
        message.channel.send({
            embed: creditsEmbed
        });
    },
    aliases: [],
    description: 'SYSLX devs'
}