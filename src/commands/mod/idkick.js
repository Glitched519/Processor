module.exports = {
    run: async(client, message, args) => {
        let reason = args.slice(19);
        let memberId = args.split(" ")[0];

        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send(":x: You don't have permission to kick a member.");
        }
        else {
            
            let member = message.guild.members.cache.get(memberId);
            if (member) {
                try {
                    await member.kick(reason);
                    if(!reason) reason = "No reason provided";
                    if (!memberId) return message.channel.send(":x: Member not found.");
                    let kickEmbed = {
                        title: ":boot: Member Kicked :boot: ",
                        description: "**Member ID: **" + memberId + "\n**Reason: **" + reason,
                        color: "#fc6203",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: kickEmbed});
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
    }, 
    aliases: ['hackkick', 'ikick', 'kickid', 'idkick'],
    description: 'Kicks a user via __ID__'
}