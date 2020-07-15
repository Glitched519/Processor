var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

module.exports = {
    run: async(client, message, args) => {
        today = mm+'/'+dd+'/'+yyyy;
        const devs = ['638064155965915187','398216672735002645']
        message.delete();
        let commitEmbed = {
            color: `RANDOM`,
            title: `Update on ` + today,
            description: `**Commit: **` + args + '\n',
            thumbnail: {
                url: client.user.displayAvatarURL(),
            },
            timestamp: new Date()
        };
        commitEmbed.description += '**Committed by:** ' + message.author.tag + '\n[Commit Log](https://github.com/Glitched519/Processor/commits/master)';
        if (devs.includes(message.author.id)) {
            message.channel.send({embed: commitEmbed});
        } else {
            message.delete();
            message.reply(":x: **You are not one of Processor's developers.**")
            .then(msg => {
			    msg.delete({timeout: 4000});
            });
        }
        
    }, 
    aliases: [],
    description: 'Embeds a commit'
}