const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageCollector } = require('discord.js')

module.exports = class ChuckNorrisJoke extends BaseCommand {
    constructor() {
        super('reqbot', 'other', ['req'])
    }

    async run(client, message) {
        message.channel.send({content: 'In order to submit your bot requires, you must send your responses in the following format:\n**Name of the bot**\n**Owner of the bot**\n**Bot Summary**\n**Valid Invite Link**'})
        let responses = []
        let filter = m => m.author.id
        let collector = new MessageCollector(message.channel, filter)
        let destination = client.channels.cache.get('784090416470425610')
        collector.on('collect', (m) => {
            responses.push(m.content)
            if (responses.length == 5) {
                message.reply("your responses have been recorded. The community will vote on your bot request.")
                return collector.stop()
            }
        })
        collector.on('end', () => {
            let resEmbed = {
                title: `${message.author.tag}'s Bot Request`,
                description: `**Name**: ${responses[1]}\n**Owner:** ${responses[2]}\n**Why your bot should be added:** ${responses[3]}\n** [Invite Link](${responses[4]})**`,
                thumbnail: {
                    url: message.author.displayAvatarURL({ dynammic: true })
                },
                color: `RANDOM`,
                timestamp: new Date()
            }
            destination.send({ embeds: [resEmbed] }).then(msg => {
                msg.react('👍').then(() => {
                    msg.react('👎')
                })
            })
        })
    }
}