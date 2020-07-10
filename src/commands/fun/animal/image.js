const { api } = require('some-random-api');

module.exports = {
    run: async(client, message, args) => {
        let imgEmbed = {
            color: `RANDOM`,
            timestamp: new Date(),
            image: {
                url: '',
            }
        }
        if (args == "$image") {
            return message.channel.send("**:information_source: You can view images of these animals: dog :dog:, cat :cat:, bird :bird:, koala :koala:, panda :panda_face:, fox :fox:, raccoon :raccoon:.**");
        }
        else if (args == "cat") {
            api.img.cat().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        else if (args == "dog") {
            api.img.dog().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        else if (args == "koala") {
            api.img.koala().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
         }
        else if (args == "panda") {
            api.img.panda().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        else if (args == "bird") {
            api.img.birb().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        else if (args == "fox") {
            api.img.fox().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        else if (args == "raccoon") {
            api.img.racoon().then(res => {
                imgEmbed.image.url = res.link;
                return message.channel.send({embed: imgEmbed});
            });
        }
        
    }, 
    aliases: ['randomimage', 'randomimg', 'img', 'pic', 'picture'],
    description: 'Shows a random image of the given animal'
}