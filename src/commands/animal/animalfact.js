const { api } = require('some-random-api');
const config = require('../../config.json');
const PREFIX = config["bot-prefix"];
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AnimalFact extends BaseCommand {
    constructor() {
        super('animalfact', 'animal', ['fact', 'randomfact', 'animalfact']);
    }

    run(client, message, args) {
        if (args[0] == ``) {
            return message.channel.send("**:information_source: You can learn facts about these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:.**");
        } else if (args[0] == "cat") {
            api.facts.cat().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args[0] == "dog") {
            api.facts.dog().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args[0] == "koala") {
            api.facts.koala().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args[0] == "panda") {
            api.facts.panda().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args[0] == "bird") {
            api.facts.bird().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        } else if (args[0] == "fox") {
            api.facts.fox().then(res => {
                return message.channel.send(res.fact);
            }).catch(err => {
                message.channel.send(":x: Something went wrong with the API. Please try again later.");
            });
        }
    }
}