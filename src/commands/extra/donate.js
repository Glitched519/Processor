module.exports = {
    run: async (client, message, args) => {
        let user = '315122013276733442';
        let usageEmbed = {
            title: "Feel Free to Support the SYSLX Team!\n(10€ for Donator Role)",
            url: "https://invite.gg/syslx",
            color: `#2a1da0`,
            thumbnail: {
                url: "https://syslx-menu.com/styles/syslxlogo.png"
            },
            description: "<@!315122013276733442>: If you want to donate to me, just send me any giftcard :laughing:.\n<@!472359202996748289>: Send me a GiftCard, if you want to donate to me.\n<@!311568543021793280>: https://www.paypal.me/RLB5\n<@!418385259634360322>: https://www.paypal.me/JameZ664\n<@!209861325940195328>: https://paypal.me/AH864?locale.x=en_US",
            timestamp: new Date(),
        }
        message.channel.send({
            embed: usageEmbed
        });
    },
    aliases: ['give'],
    description: 'Procedure on how to use SYSLX menu'
}