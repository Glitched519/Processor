const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

const rules = [
    "No recording or anything that violates the privacy rules(except for livestreams, but you must set [live] in your name & you have to ask permission to the people in your channel). (Recording is allowed when everyone agrees.)",
    "No mute abuse.",
    "Respect the admins and members!",
    "Don't copy names. For example: Nickname1, Nickname2, etc.",
    "Don't spam or bother others user with Poke and messages. (Channel hopping is also spam!)",
    "Voice convertors are not allowed.",
    "The channel admin has the responsibility for the channel/server. If you have problems, contact the admin in charge.",
    "This page does not cover all the rules; only the basic ones. If an admin finds an unfitting behavior he will moderate it accordingly.",
    "No racism, racism will provide you an instant perm ban.",
    "No verbal abuse.",
    "All racist, right-wing, and sexually questionable statements to refrain in any case and will not be tolerated in principle.",
    "Attacks against the server with so-called `flood-tools` are strictly prohibited and will, where appropriate, prosecuted by the provider.",
    "Please use a name that others will be able to recognize you as from in-game. Don't use fake nickname.",
    "Don't send links to scam websites, porn websites, phishing websites or anything that can harm the user's computer or are considered inappropriate as we want the users on the Discord server to feel safe while being on it.",
    "Joining channels that you don't usually associate with for the purpose of trolling is also not permitted.",
    "NO advertising of any kind in our Discord server, This includes links to sites that earn you money. Admins decide what is allowed and what is not. DONT asume anything check with an admin first.",
    "Don't link external website or images that included sexual, racist, violent, disturbing or inappropiate content.",
    "Selling or promoting paid stuff Like Accounts is not allowed.",
    "Don't advertise via DMs.",
    "Don't talk about other cheats or other mod menus."
]

module.exports = {
    run: async (client, message, args) => {
        let index = parseInt(args);
        if (args == `${PREFIX}rule`) {
            return message.channel.send(":grey_question: **Which rule are you looking for?**")
                .then(msg => {
                    msg.delete({
                        timeout: 4000
                    });
                });
        }
        if (index >= 1 && index <= rules.length) {
            message.channel.send(`**${index})** ${rules[index - 1]}`);
        } else {
            message.channel.send(":x: **Rule not found.**")
                .then(msg => {
                    msg.delete({
                        timeout: 4000
                    });
                });
        }
    },
    aliases: [],
    description: 'Shows a specific rule of SYSLX discord'
}