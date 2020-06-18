const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        let reason = args.slice(23);
        let memberId = args.split(" ")[0];

            if (!message.member.hasPermission('KICK_MEMBERS')) {
                message.channel.send(":x: You don't have permission to kick a member.");
            }
            
            let member = message.mentions.members.first();
            if(!member.kickable) 
            return message.reply(":x: I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

            if(!reason) reason = "No reason provided";
            
            await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of: ${error}`));
            message.channel.send(`:boot: ${member.user.tag} has been kicked from the server. \nReason: ${reason}`);
        },
    aliases: ['ukick', 'kickuser', 'userkick'],
    description: 'Kicks a user via __tag__'
}