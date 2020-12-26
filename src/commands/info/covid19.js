const covid = require('novelcovid');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Author extends BaseCommand {
    constructor() {
        super('covid19', 'info', ['covid', 'cov']);
    }

    async run(client, message, args) {
        if (!args[0]) {
            const covidStats = await covid.all();
            return message.channel.send(new MessageEmbed()
                .setTitle('COVID-19 Stats (Worldwide)')
                .setColor("RED")
                .addFields(
                    { name: 'Cases', value: covidStats.cases.toLocaleString(), inline: true },
                    { name: 'Deaths', value: covidStats.deaths.toLocaleString(), inline: true },
                    { name: 'Recovered', value: covidStats.recovered.toLocaleString(), inline: true },
                    { name: 'Cases Today', value: covidStats.todayCases.toLocaleString(), inline: true },
                    { name: 'Deaths Today', value: covidStats.todayDeaths.toLocaleString(), inline: true },
                    { name: 'Recovered Today', value: covidStats.todayRecovered.toLocaleString(), inline: true },
                    { name: 'Current Infections', value: covidStats.active.toLocaleString(), inline: true },
                    { name: 'Critical Condition', value: covidStats.critical.toLocaleString(), inline: true },
                    { name: 'Tested', value: covidStats.tests.toLocaleString(), inline: true },
                )
                .setFooter(new Date())
            )
        }
        else {
            const covidStats = await covid.countries({ country: args[0] });
            const errorMessage = "Country not found or doesn't have any cases";
            if (covidStats.message == errorMessage) return message.channel.send(errorMessage);

            return message.channel.send(new MessageEmbed()
                .setTitle(`COVID-19 Stats (${args[0]})`)
                .setColor("RED")
                .addFields(
                    { name: 'Cases', value: covidStats.cases.toLocaleString(), inline: true },
                    { name: 'Deaths', value: covidStats.deaths.toLocaleString(), inline: true },
                    { name: 'Recovered', value: covidStats.recovered.toLocaleString(), inline: true },
                    { name: 'Current Infections', value: covidStats.active.toLocaleString(), inline: true },
                    { name: 'Critical Condition', value: covidStats.critical.toLocaleString(), inline: true },
                    { name: 'Tested', value: covidStats.tests.toLocaleString(), inline: true },
                )
                .setFooter(new Date().toLocaleTimeString())
            )
        }
    }
}