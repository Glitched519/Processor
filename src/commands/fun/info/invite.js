module.exports = {
    run: async(client, message, args) => {
        message.channel.send('**The more, the merrier!** https://discord.com/oauth2/authorize?client_id=689678745782714464&scope=bot');
    },
    aliases: ['botinvite'],
    description: 'Gives the bot\'s invite link'
 }