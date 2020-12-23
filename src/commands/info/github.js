module.exports = {
    run: async (client, message, args) => {
        let codeEmbed = {
            color: `RANDOM`,
            title: "Here's All My Stuff!",
            description: ':arrow_right: [GitHub Link!](https://github.com/Glitched519/Processor) :arrow_left:',
            timestamp: new Date()
        }
        message.channel.send({ embed: codeEmbed });

    },
    aliases: ['code', 'source'],
    description: 'Brings up the GitHub repo of Processor'
}