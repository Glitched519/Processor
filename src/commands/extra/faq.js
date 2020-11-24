const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

const faqTitle = [
    "How to download the SYSLX menu?",
    "How do I open SYSLX menu?",
    "Are the files you download for the menu infected?!",
    "Public or Private session for moneydrop? (Which is safer?)"
]

const faqDesc = [
    "Just go into <#684462139427389550> channel and click on the link, after this you need to find the SYSLX Menu and click the blue download button below it. If there are updates of the mod menu, you just have to download it again from the web and do the instructions. It’s that easy!",
    "Press `F4` or `*` on your numpad when the mod menu is injected. If you are on Laptop you have to press `FN + F4` because most laptops have built in features for those keys.",
    "No, of course not. SYSLX Free & VIP is manipulating things called `values` in your GTA V and nothing else. SYSLX Free & VIP is safe to use! For more info DM <@!311568543021793280>.",
    "In a public session you only need to worry about the people seeing you. As there are more people in Public than Private you can blend in and not get caught only if players report you. In private sessions, the servers usually get checked by Rockstar cause they figured out that most of modders mod in these sessions."
]

module.exports = {
    run: async (client, message, args) => {
        let index = parseInt(args);
        if (args == `${PREFIX}faq`) {
            return message.channel.send(":grey_question: **Which FAQ are you looking for?**")
                .then(msg => {
                    msg.delete({
                        timeout: 4000
                    });
                });
        }
        if (index >= 1 && index <= faqTitle.length) {
            let faqEmbed = {
                title: faqTitle[index - 1],
                url: "https://invite.gg/syslx",
                color: `#2a1da0`,
                thumbnail: {
                    url: "https://syslx-menu.com/styles/syslxlogo.png"
                },
                description: faqDesc[index - 1],
                timestamp: new Date()
            }
            message.channel.send({
                embed: faqEmbed
            });
        } else if (args == 'all') {
            allFAQ = "";
            for (let i = 0; i < faqDesc.length; i++) {
                allFAQ += `**${i + 1})** ${faqTitle[i]}\n`;
            }
            let FAQEmbed = {
                title: "SYSLX FAQ",
                url: "https://invite.gg/syslx",
                color: `#2a1da0`,
                thumbnail: {
                    url: "https://syslx-menu.com/styles/syslxlogo.png"
                },
                description: allFAQ,
                timestamp: new Date()
            }
            message.channel.send({
                embed: FAQEmbed
            });
        } else {
            message.channel.send(":x: **FAQ not found.**")
                .then(msg => {
                    msg.delete({
                        timeout: 4000
                    });
                });
        }
    },
    aliases: [],
    description: 'Shows an FAQ'
}
