module.exports = {
    run: async(client, message, args) => {
        const dev = client.users.cache.get('638064155965915187');
        if(args == "$suggest") {
            message.delete();
            message.reply(':memo: **What do you want to suggest?**')
            .then(msg => {
			    msg.delete({timeout: 4000});
            });
        return;
        } 
        else if (args.length < 20) {
            message.delete();
            message.reply(':memo: **Please give a better suggestion.**')
            .then(msg => {
                msg.delete({timeout: 4000});
            });
            return;
        }
        
        let suggestionEmbed = {
            title: "New Suggestion",
            description: args,
            color: '#e298ff',
            timestamp: new Date()            
        }
        dev.send({ embed: suggestionEmbed });

        let thankEmbed = {
            title: "Suggestion Submitted",
            description: "**Your suggestion is so amazing, I let the dev know about it!**",
            color: '#e298ff',
            timestamp: new Date()
        }
        message.reply({ embed: thankEmbed });
    },
    aliases: ['recommend', 'idea'],
    description: 'DMs a user-suggested idea to the bot dev'
}