const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        message.delete();
        if(message.content == `${PREFIX}poll`) return;
        let pollEmbed = {
            title: `${message.author.username} asks...`,
            description: args,
            timestamp: new Date()
        }
        message.channel.send({embed: pollEmbed}).then(embedMessage => {
            embedMessage.react("✅")
            embedMessage.react("❌")
        });
    },
    aliases: ['question', 'survey'],
    description: 'Sends a poll with two options to react to'
}