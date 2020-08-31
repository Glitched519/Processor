module.exports = {
    run: async(client, message, args) => {
        let reason = args.slice(19);
        let memberId = args.split(" ")[0];
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(":x: **You don't have permission to ban a member.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        else {
            try {
            let bannedMember = await message.guild.members.ban(memberId);
                if(bannedMember) {
                    if(!reason) reason = "No reason provided.";
                    if (!bannedMember.tag) {
                        message.channel.send(":x: **Member not found.**")
                        .then(msg => {
                            msg.delete({timeout: 4000});
                        });
                    }
                    let banEmbed = {
                        title: ":hammer_pick: Member Banned :hammer_pick: ",
                        description: "**Member ID: **" + memberId + "\n**Reason: **" + reason,
                        color: "#fc1c03",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: banEmbed});
                }
            }
            catch (err) {
                return message.reply(":x: **I cannot ban this user! Do they have a higher role? Do I have ban permissions?**")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
                }
            }
    },
    aliases: ['hackban', 'iban', 'banid', 'idban'],
    description: 'Bans a user via __ID__'
}