const { api } = require('some-random-api');
const config = require('../../config.json');
const PREFIX = config["bot-prefix"];
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AnimalImage extends BaseCommand {
  constructor() {
    super('animalimage', 'animal', ['randomimage', 'randomimg', 'animal', 'picture']);
  }

  run(client, message, args) {
    let imgEmbed = {
      color: `RANDOM`,
      timestamp: new Date(),
      image: {
        url: '',
      }
    }
    switch (args[0]) {
      case ``:
        return message.channel.send("**:information_source: You can view images of these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:, raccoon :raccoon:.**");
        break;
      case "cat":
        api.img.cat().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "dog":
        api.img.dog().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "koala":
        api.img.koala().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "panda":
        api.img.panda().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "bird":
        api.img.birb().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "fox":
        api.img.fox().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
      case "raccoon":
        api.img.racoon().then(res => {
          imgEmbed.image.url = res.link;
          return message.channel.send({
            embed: imgEmbed
          });
        }).catch(err => {
          message.channel.send(":x: Something went wrong with the API. Please try again later.");
        });
        break;
    }
  }
}