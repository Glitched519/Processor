const covid = require('novelcovid')
const { MessageEmbed } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class Author extends BaseCommand {
    constructor() {
        super('covid19', 'info', ['covid', 'cov'])
    }

    async run(client, message, args) {
        if (!args[0]) {
            const covidStats = await covid.all()
            let globalCovidEmbed = new MessageEmbed()
                .setTitle('COVID-19 Stats (Worldwide)')
                .setColor("RED")
                .addField('Cases', covidStats.cases.toLocaleString(), true)
                .addField('Deaths', covidStats.deaths.toLocaleString(), true)
                .addField('Recovered', covidStats.recovered.toLocaleString(), true)
                .addField('Cases Today', covidStats.todayCases.toLocaleString(), true)
                .addField('Deaths Today', covidStats.todayDeaths.toLocaleString(), true)
                .addField('Recovered Today', covidStats.todayRecovered.toLocaleString(), true)
                .addField('Current Infections', covidStats.active.toLocaleString(), true)
                .addField('Critical Condition', covidStats.critical.toLocaleString(), true)
                .addField('Tested', covidStats.tests.toLocaleString(), true)
                .setFooter(new Date().toLocaleTimeString())
            return message.reply({ embeds: [globalCovidEmbed] })
        }
        else {
            const covidStats = await covid.countries({ country: args[0] })
            const errorMessage = "Country not found or doesn't have any cases"
            if (covidStats.message == errorMessage) return message.reply(errorMessage)

            let covidEmbed = new MessageEmbed()
                .setTitle(`COVID-19 Stats (${args[0]})`)
                .setColor("RED")
                .addField('Cases', covidStats.cases.toLocaleString(), true)
                .addField('Deaths', covidStats.deaths.toLocaleString(), true)
                .addField('Recovered', covidStats.recovered.toLocaleString(), true)
                .addField('Current Infections', covidStats.active.toLocaleString(), true)
                .addField('Critical Condition', covidStats.critical.toLocaleString(), true)
                .addField('Tested', covidStats.tests.toLocaleString(), true)
                .setFooter(new Date().toLocaleTimeString())

            message.reply({ embeds: [covidEmbed] })
        }
    }
}