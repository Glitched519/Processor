module.exports = {
    run: async (client, message, args) => {
        let teamEmbed = {
            title: "SYSLX Team",
            url: "https://syslx-menu.com/team/",
            color: `#2a1da0`,
            thumbnail: {
                url: "https://syslx-menu.com/styles/syslxlogo.png"
            },
            fields: [{
                name: "President",
                value: "<@!315122013276733442>"
            },
            {
                name: "Vice President",
                value: "<@!472359202996748289>"
            },
            {
                name: "Official VIP Seller",
                value: "<@!688082203309113344>"
            },
            {
                name: "Community Manager",
                value: "<@!729975915353997353>"
            },
            {
                name: "Head Staff",
                value: "<@!311568543021793280>"
            },
            {
                name: "Staff",
                value: "<@!418385259634360322>\n<@!712698456879267893>"
            },
            {
                name: "Moderator",
                value: "<@!209861325940195328>"
            },
            {
                name: "Head Supporter",
                value: "<@!582543766590717972>"
            },
            {
                name: "Supporter",
                value: "<@!687474799550660618>"
            },
            {
                name: "Helper",
                value: "<@!638064155965915187>\n<@!675416995436691456>\n<@!582580080807510016>\n<@!445676208810622986>\n<@!660626678195814431>"
            },
            ],
            timestamp: new Date(),
        }
        message.channel.send({
            embed: teamEmbed
        });
    },
    aliases: [],
    description: 'Procedure on how to use SYSLX menu'
}