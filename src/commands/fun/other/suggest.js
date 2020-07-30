const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if(message.content == `${PREFIX}suggest`) return;
        let suggestEmbed = {
            color: `RANDOM`,
            title: `${message.author.username} suggests...`,
            description: args,
            timestamp: new Date()
        }
        message.channel.send({embed: suggestEmbed}).then(embedMessage => {
            embedMessage.react("✅")
            embedMessage.react("❌")
        });
    },
    aliases: [''],
    description: 'Sends a suggestion with two options to react to'
}