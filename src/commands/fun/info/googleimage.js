const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    run: async(client, message, args) => {
        function image(message) {
            let options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + args,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            }

            request(options, function(error, response, responseBody) {
                if (error) return;
         
                $ = cheerio.load(responseBody);    
                let links = $(".image a.link");
                let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
         
                if (!urls.length) return;
         
                // Send result
                let imgEmbed = {
                    image: {
                        url: urls[Math.floor(Math.random() * urls.length)]
                    },
                    timestamp: new Date()
                }
                message.channel.send({embed: imgEmbed});
            });
    
        }

        image(message);
    }, 
    aliases: ['image', 'img'],
    description: 'Shows an image from google'
}