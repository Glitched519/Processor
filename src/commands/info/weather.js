const weather = require('weather-js');
const config = require('../../config.json');
const PREFIX = config.prefix;
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Weather extends BaseCommand {
  constructor() {
    super('weather', 'info', []);
  }

  run(client, message, args) {
    weather.find({ search: args.join(' '), degreeType: "C" }, function (err, result) {
      if (err) console.log(err);
      try {
        let weatherEmbed = {
          color: `RANDOM`,
          title: `${result[0].current.skytext} in ${result[0].location.name}`,
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
              name: 'Wind Speed',
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
        message.channel.send({ embed: weatherEmbed });
      } catch (err) {
        message.channel.send(":x: **That isn't a valid location.**")
          .then(msg => {
            msg.delete({ timeout: 4000 });
          });
      }
    });
  }
}