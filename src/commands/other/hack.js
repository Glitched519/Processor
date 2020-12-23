const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        let randomDelay = Math.floor(Math.random() * (6000 - 2000)) + 2000;
        let ip1 = Math.floor(Math.random() * 255);
        let ip2 = Math.floor(Math.random() * 255);
        let ip3 = Math.floor(Math.random() * 255);
        let ip4 = Math.floor(Math.random() * 255);
        let fails = ["I forgot what I was doing.", "Oops! Busted!", "Wait, what was I doing?",
            "Oof! That didn't work.", "Wait, what am I hacking again?", "Oh no, I forgot how to hack!",
            `I don't think I can hack ${args}`, `${args} is unhackable`, `${args} got the biggest antivirus ever.`,
            "I blew the hack! Now the FBI is looking for me."];
        let hacks = [`Found ${args}'s IP address: ${ip1}.${ip2}.${ip3}.${ip4} ||Jk||`, `${args}'s private data has been sold to the government.`,
        `${args} has been hacked and will get viruses on his computer forever!`, `${args}'s Fortnite dances have been uploaded to his boss's network!`,
        `${args} has to pay $${ip1} to get his data back.`, `Oh look, ${args} just lost all his money!`];
        let chance = Math.random();
        if (args == `<@!689678745782714464>`) {
            return message.reply("good luck with that!")
        }
        if (args == `${PREFIX}hack`) {
            return message.reply("who do you want to hack?");
        }
        if (chance >= 0.4) {
            return message.channel.send('Hacking ' + args + '...')
            .then(msg => {
                setTimeout(function () {
                    msg.edit(hacks[Math.floor(Math.random() * hacks.length)]);
                }, randomDelay)
            }).catch(console.error);
        }
        else {
            return message.channel.send('Hacking ' + args + '...')
            .then(msg => {
                setTimeout(function () {
                    msg.edit(fails[Math.floor(Math.random() * fails.length)]);
                }, randomDelay)
            }).catch(console.error);
        }
    },
    aliases: [],
    description: 'Hacks a user (not really)'
}