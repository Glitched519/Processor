const fetch = require('node-fetch')
const APIKey = require('../../config.json')['weather-key']
const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Prefix extends BaseCommand {
    constructor() {
        super('weather', 'info', ['wea'])
    }

    async run(client, message, args) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${APIKey}&units=metric`)
            .then(res => res.json())
            .then(base => {
                let notFoundEmbed = new MessageEmbed()
                    .setDescription('Location not found.')
                    .setColor('RED')
                if (base.cod == '404') return message.reply({ embeds: [notFoundEmbed] })
                let weather = base.weather[0]
                let main = base.main
                let sunrise = new Date(base.sys.sunrise * 1000).toLocaleTimeString()
                let sunset = new Date(base.sys.sunset * 1000).toLocaleTimeString()
                const weatherEmbed = new MessageEmbed()
                    .setTitle(`:white_sun_rain_cloud: Current Weather in ${base.name}, ${base.sys.country}`)
                    .setURL(`https://openweathermap.org/city/${base.id}`)
                    .setDescription(`${weather.main} (${weather.description})`)
                    .setColor(`RANDOM`)
                    .addField('Temperature', `${Math.round(main.temp)}°C (${Math.round(main.temp * 1.8 + 32)}°F)`, true)
                    .addField('Min Temp', `${Math.round(main.temp_min)}°C (${Math.round(main.temp_min * 1.8 + 32)}°F)`, true)
                    .addField('Max Temp', `${Math.round(main.temp_max)}°C (${Math.round(main.temp_max * 1.8 + 32)}°F)`, true)
                    .addField('Feels Like', `${Math.round(main.feels_like)}°C (${Math.round(main.feels_like * 1.8 + 32)}°F)`, true)
                    .addField('Humidity', `${Math.round(main.humidity)}%`, true)
                    .addField('Pressure', `${main.pressure}hPa`, true)
                    .addField('Sunrise', sunrise, true)
                    .addField('Sunset', sunset, true)
                    .addField('Wind Speed', `${base.wind.speed}m/s`, true)
                    .setThumbnail(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
                    .setTimestamp()
                    .setFooter(`From openweathermap.org`, `https://openweathermap.org/img/wn/02d@2x.png`)
                return message.reply({ embeds: [weatherEmbed] })
            })
    }
}