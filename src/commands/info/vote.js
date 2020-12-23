module.exports = {
    run: async (client, message, args) => {
        let voteEmbed = {
            color: `RANDOM`,
            title: "Vote for Me!",
            description: ':arrow_right: [Vote Me on top.gg!](https://top.gg/bot/689678745782714464/vote) :arrow_left:',
            footer: `Thanks for all the support :blue_heart:`
        }
        message.channel.send({ embed: voteEmbed });

    },
    aliases: [],
    description: 'Brings up the vote link of Processor'
}