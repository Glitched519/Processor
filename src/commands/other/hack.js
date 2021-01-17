const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Hack extends BaseCommand {
    constructor() {
        super('hack', 'other', []);
    }

    async run(client, message, args) {
        let randomDelay = Math.floor(Math.random() * (6000 - 2000)) + 2000;
        let ip1 = Math.floor(Math.random() * 255);
        let ip2 = Math.floor(Math.random() * 255);
        let ip3 = Math.floor(Math.random() * 255);
        let ip4 = Math.floor(Math.random() * 255);
        let fails = ["I forgot what I was doing.", "Oops! Busted!", "Wait, what was I doing?",
            "Oof! That didn't work.", "Wait, what am I hacking again?", "Oh no, I forgot how to hack!",
            `I don't think I can hack ${args[0]}`, `${args[0]} is unhackable`, `${args[0]} got the biggest antivirus ever.`,
            "I blew the hack! Now the FBI is looking for me."];
        let hacks = [`Found ${args[0]}'s IP address: ${ip1}.${ip2}.${ip3}.${ip4} ||Jk||`, `${args[0]}'s private data has been sold to the government.`,
        `${args[0]} has been hacked and will get viruses on his computer forever!`, `${args[0]}'s Fortnite dances have been uploaded to his boss's network!`,
        `${args[0]} has to pay $${ip1} to get his data back.`, `Oh look, ${args[0]} just lost all his money!`];
        let chance = Math.random();
        if (args[0] == `<@!689678745782714464>`) {
            return message.reply("good luck with that!")
        }
        if (!args[0]) {
            return message.reply("who do you want to hack?");
        }
        if (chance >= 0.4) {
            return message.channel.send('Hacking ' + args[0] + '...')
                .then(msg => {
                    setTimeout(function () {
                        msg.edit(hacks[Math.floor(Math.random() * hacks.length)]);
                    }, randomDelay)
                }).catch(console.error);
        }
        else {
            return message.channel.send('Hacking ' + args[0] + '...')
                .then(msg => {
                    setTimeout(function () {
                        msg.edit(fails[Math.floor(Math.random() * fails.length)]);
                    }, randomDelay)
                }).catch(console.error);
        }
    }
}