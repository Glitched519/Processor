const { api } = require('some-random-api');
const config = require('../../config.json');
const PREFIX = config["bot-prefix"];

module.exports = {
    run: async (client, message, args) => {
        if (args == `${PREFIX}fact`) {
            return message.channel.send("**:information_source: You can learn facts about these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:.**");
        } else if (args == "cat") {
            api.facts.cat().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args == "dog") {
            api.facts.dog().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args == "koala") {
            api.facts.koala().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args == "panda") {
            api.facts.panda().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args == "bird") {
            api.facts.bird().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args == "fox") {
            api.facts.fox().then(res => {
                return message.channel.send(res.fact);
            }).catch (err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        }
    },
    aliases: ['fact', 'randomfact', 'animalfact'],
    description: 'Shows a random fact of the given animal'
}