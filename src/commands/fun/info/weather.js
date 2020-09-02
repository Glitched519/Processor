const weather = require('weather-js');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        weather.find({search: args, degreeType: "C"}, function(err, result) {
            if(err) console.log(err);
            if(args == `${PREFIX}weather`) {
                message.channel.send(":x: **You need to give a location.**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
            }
            try {
                let weatherEmbed = {
                    color: `RANDOM`,
                    title: `Weather in ${result[0].location.name}`,
                    thumbnail: {
                        url: result[0].current.imageUrl,
                    },
                    fields: [
                        {
                            name: 'Temperature',
                            value: `${result[0].current.temperature}°C`,
                            inline: true
                        },
                        {
                            name: 'Feels Like',
                            value: `${result[0].current.feelslike}°C`,
                            inline: true
                        },
                        {
                            name: `${result[0].current.skytext}`,
                            value: `${result[0].current.winddisplay}`,
                            inline: true
                        },
                        {
                            name: `**3-day Forecast**`,
                            value: '------------------',
                        },
                        {
                            name: `${result[0].forecast[2].day}`,
                            value: `**${result[0].forecast[2].skytextday}**\nLow:  ${result[0].forecast[2].low}\nHigh:  ${result[0].forecast[2].high}`,
                            inline: true
                        },
                        {
                            name: `${result[0].forecast[3].day}`,
                            value: `**${result[0].forecast[3].skytextday}**\nLow:  ${result[0].forecast[3].low}\nHigh:  ${result[0].forecast[3].high}`,
                            inline: true
                        },
                        {
                            name: `${result[0].forecast[4].day}`,
                            value: `**${result[0].forecast[4].skytextday}**\nLow:  ${result[0].forecast[4].low}\nHigh:  ${result[0].forecast[4].high}`,
                            inline: true
                        },
                    ],
                    timestamp: new Date()
                }
                message.channel.send({embed: weatherEmbed});
            } catch (err) {
                message.channel.send(":x: **That isn't a valid location.**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
            }
          });

    }, 
    aliases: [],
    description: 'Finds weather in an area'
}