const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        let words = args.split();
        let reason = args.slice(23);

            if (!message.member.hasPermission('BAN_MEMBERS')) {
                message.channel.send(":x: You don't have permission to ban a member.");
            }
            
            let member = message.mentions.members.first();
            if(!member)
            return message.reply(":x: Please mention a valid member of this server");
            if(!member.bannable) 
            return message.reply(":x: I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

            if(!reason) reason = "No reason provided";
            
            await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of: ${error}`));
            message.guild.members.ban(member);

            message.channel.send(`:hammer_pick: ${member.user.tag} has been banned from the server. \nReason: ${reason}`);
        },
    aliases: ['uban', 'banuser', 'userban'],
    description: 'Bans a user via __tag__'
}