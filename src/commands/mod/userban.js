const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        let reason = args.slice(22);
        let memberTag = args.split(" ")[0];

            if (!message.member.hasPermission('BAN_MEMBERS')) {
                message.channel.send(":x: **You don't have permission to ban a member.**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
            }
            
            let member = message.mentions.members.first();
            if(!member)
            return message.reply(":x: **Please mention a valid member of this server.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
            if(!member.bannable) 
            return message.reply(":x: **I cannot ban this user! Do they have a higher role? Do I have ban permissions?**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });

            if(!reason) reason = "No reason provided.";
            
            await member.ban({days: 7, reason: reason})
            .catch(error => message.reply(`**Sorry ${message.author}. I couldn't ban because of: ${error}**`));
            message.guild.members.ban(member);

            let banEmbed = {
                title: ":hammer_pick: Member Banned :hammer_pick: ",
                description: "**Member: **" + member.user.tag + "\n**Reason: **" + reason,
                color: "#fc1c03",
                timestamp: new Date()
            }
            message.channel.send({embed: banEmbed});
        },
    aliases: ['ban', 'uban', 'banuser', 'userban'],
    description: 'Bans a user via __tag__'
}