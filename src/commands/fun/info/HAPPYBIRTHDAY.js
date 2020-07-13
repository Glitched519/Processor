module.exports = {
    run: async(client, message, args) => {
        const dev = client.users.cache.get('638064155965915187');
        let birthdayEmbed = {
            color: `RANDOM`,
            title: `It's My Developer's Birthday!`,
            description: `Say happy birthday to ${dev}!`,
            image : {
                url: `https://media0.giphy.com/media/j6lURCOFcU8N9LNpi2/source.gif`
            },
            timestamp: new Date()
        };
        message.channel.send({embed: birthdayEmbed});
        
    }, 
    aliases: ['hb', 'happybirthday', 'birthday'],
    description: 'Shows the creator of this awesome bot'
}