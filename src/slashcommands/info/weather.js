const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const APIKey = require("../../config.json")["weather-key"];

module.exports = {
    data: {
        "name": "weather",
        "description": "Displays weather info for a location.",
        "options": [
            {
                "type": 3,
                "name": "location",
                "description": "Location ",
                "required": true
            }
        ]
    },
    async run(client, interaction) {
        const location = interaction.options.getString("location");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`)
            .then(res => res.json())
            .then(base => {
                let notFoundEmbed = new MessageEmbed()
                    .setDescription("Location not found.")
                    .setColor("RED");
                if (base.cod == "404") return interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
                let main = base.main;
                let weather = base.weather[0];
                let sunrise = new Date(base.sys.sunrise * 1000).toLocaleTimeString();
                let sunset = new Date(base.sys.sunset * 1000).toLocaleTimeString();
                const weatherEmbed = new MessageEmbed()
                    .setTitle(`:white_sun_rain_cloud: Current Weather in ${base.name}, ${base.sys.country}`)
                    .setURL(`https://openweathermap.org/city/${base.id}`)
                    .setDescription(`${weather.main} (${weather.description})`)
                    .setColor("RANDOM")
                    .addField("Temperature", `${Math.round(main.temp)}°C (${Math.round(main.temp * 1.8 + 32)}°F)`, true)
                    .addField("Min Temp", `${Math.round(main.temp_min)}°C (${Math.round(main.temp_min * 1.8 + 32)}°F)`, true)
                    .addField("Max Temp", `${Math.round(main.temp_max)}°C (${Math.round(main.temp_max * 1.8 + 32)}°F)`, true)
                    .addField("Feels Like", `${Math.round(main.feels_like)}°C (${Math.round(main.feels_like * 1.8 + 32)}°F)`, true)
                    .addField("Humidity", `${Math.round(main.humidity)}%`, true)
                    .addField("Pressure", `${main.pressure}hPa`, true)
                    .addField("Sunrise", sunrise, true)
                    .addField("Sunset", sunset, true)
                    .setThumbnail(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
                    .addField("Wind Speed", `${base.wind.speed}m/s`, true)
                    .setTimestamp();
                return interaction.reply({ embeds: [weatherEmbed] });
            });
    }
};