const PREFIX = process.env.PREFIX;

let tos = [
    "No reversing or cracking our menu or showing intent to do so.",
    "Multi Accounting is strictly prohibited and will result in a permanent IP/MAC ban.",
    "No using our menu to improve competitors' product.",
    "No sharing of your account.",
    "No selling/trading your account.",
    "No leaking information out of the paid section.",
    "No chargeback.",
    "Once you purchase you will not be eligible for any refunds.",
    "You agree that using this menu is at your own risk and as such you aren't entitled to any compensation in case of a suspension.",
    "Spamming is forbidden.",
    "Don't use any kind of VPN (Virtual Private Network) software or service, you may will get auto-banned.",
    "You need to have basic Windows knowledge.",
    "To use our menu you need to be at least 16 years old."
]

module.exports = {
    run: async(client, message, args) => {
        let index = parseInt(args);
        if (args == `${PREFIX}tos`) {
            return message.channel.send(":grey_question: **Which TOS rule are you looking for?**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        if (index >= 1 && index <= tos.length) {
            message.channel.send(`**${index})** ${tos[index-1]}`);
        }
        else {
            message.channel.send(":x: **TOS rule not found.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }       
    },
    aliases: [],
    description: 'Shows a specific TOS rule of SYSLX'
}