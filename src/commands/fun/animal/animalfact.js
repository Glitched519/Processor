const {
    api
} = require('some-random-api');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        if (args == `${PREFIX}fact`) {
            return message.channel.send("**:information_source: You can learn facts about these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:.**");
        } else if (args == "cat") {
            api.facts.cat().then(res => {
                return message.channel.send(res.fact);
            });
        } else if (args == "dog") {
            api.facts.dog().then(res => {
                return message.channel.send(res.fact);
            });
        } else if (args == "koala") {
            api.facts.koala().then(res => {
                return message.channel.send(res.fact);
            });
        } else if (args == "panda") {
            api.facts.panda().then(res => {
                return message.channel.send(res.fact);
            });
        } else if (args == "bird") {
            api.facts.bird().then(res => {
                return message.channel.send(res.fact);
            });
        } else if (args == "fox") {
            api.facts.fox().then(res => {
                return message.channel.send(res.fact);
            });
        }
    },
    aliases: ['fact', 'randomfact', 'animalfact'],
    description: 'Shows a random fact of the given animal'
}