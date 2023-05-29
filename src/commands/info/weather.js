const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const APIKey = require("../../config.json")["weather-key"];

module.exports = {
    callback: async (client, interaction) => {
        const initTime = Date.now();
        const location = interaction.options.getString("location");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`)
            .then(res => res.json())
            .then(base => {
                let notFoundEmbed = new EmbedBuilder()
                    .setDescription("Location not found.")
                    .setColor("Red");
                if (base.cod == "404") return interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
                let main = base.main;
                let weather = base.weather[0];
                let sunrise = new Date(base.sys.sunrise * 1000).toLocaleTimeString();
                let sunset = new Date(base.sys.sunset * 1000).toLocaleTimeString();
                const weatherEmbed = new EmbedBuilder()
                    .setTitle(`:white_sun_rain_cloud: Current Weather in ${base.name}, ${base.sys.country}`)
                    .setURL(`https://openweathermap.org/city/${base.id}`)
                    .setDescription(`${weather.main} (${weather.description})`)
                    .setColor("DarkButNotBlack")
                    .addFields([
                        { name: "Temperature", value: `${Math.round(main.temp)}°C (${Math.round(main.temp * 1.8 + 32)}°F)`, inline: true },
                        { name: "Min Temp", value: `${Math.round(main.temp_min)}°C (${Math.round(main.temp_min * 1.8 + 32)}°F)`, inline: true },
                        { name: "Max Temp", value: `${Math.round(main.temp_max)}°C (${Math.round(main.temp_max * 1.8 + 32)}°F)`, inline: true },
                        { name: "Feels Like", value: `${Math.round(main.feels_like)}°C (${Math.round(main.feels_like * 1.8 + 32)}°F)`, inline: true },
                        { name: "Humidity", value: `${Math.round(main.humidity)}%`, inline: true },
                        { name: "Pressure", value: `${Math.round(main.pressure)}hPa`, inline: true },
                        { name: "Sunrise", value: sunrise, inline: true },
                        { name: "Sunset", value: sunset, inline: true },
                        { name: "Wind Speed", value: `${base.wind.speed}m/s`, inline: true },
                    ])
                    .setThumbnail(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
                    .setFooter({ text: `⏱️ ${Date.now() - initTime + client.ws.ping} ms | ${new Date()}` });
                interaction.reply({ embeds: [weatherEmbed] });
            });
    },
    name: "weather",
    description: "Displays weather info for a location.",
    options: [
        {
            type: 3,
            name: "location",
            description: "Location",
            required: true
        }
    ]
}