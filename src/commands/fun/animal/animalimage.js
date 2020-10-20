const {
    api
} = require('some-random-api');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async (client, message, args) => {
        let imgEmbed = {
            color: `RANDOM`,
            timestamp: new Date(),
            image: {
                url: '',
            }
        }
        switch (args) {
            case `${PREFIX}args`:
                return message.channel.send("**:information_source: You can view images of these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:, raccoon :raccoon:.**");
                break;
            case "cat":
                api.img.cat().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "dog":
                api.img.dog().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "koala":
                api.img.koala().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "panda":
                api.img.panda().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "bird":
                api.img.birb().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "fox":
                api.img.fox().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
            case "raccoon":
                api.img.racoon().then(res => {
                    imgEmbed.image.url = res.link;
                    return message.channel.send({
                        embed: imgEmbed
                    });
                });
                break;
        }

    },
    aliases: ['randomimage', 'randomimg', 'animal', 'picture'],
    description: 'Shows a random image of the given animal'
}