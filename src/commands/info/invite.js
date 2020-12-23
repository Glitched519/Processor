module.exports = {
    run: async (client, message, args) => {
        let inviteEmbed = {
            color: `RANDOM`,
            title: 'The More, The Merrier!',
            description: ':arrow_right: [Invite Me!](https://discord.com/oauth2/authorize?client_id=689678745782714464&scope=bot&permissions=2134338815) :arrow_left:',
            timestamp: new Date()
        }
        message.channel.send({ embed: inviteEmbed });
    },
    aliases: ['botinvite'],
    description: 'Gives the bot\'s invite link'
}
