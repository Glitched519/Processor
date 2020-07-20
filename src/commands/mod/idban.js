module.exports = {
    run: async(client, message, args) => {
        let reason = args.slice(19);
        let memberId = args.split(" ")[0];

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send(":x: You don't have permission to ban a member.");
        }
        else {
            try {
            let bannedMember = await message.guild.members.ban(memberId);
                if(bannedMember) {
                    if(!reason) reason = "No reason provided";
                    if (!bannedMember.tag) return message.channel.send(":x: Member not found.");
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
                console.log(err);
                }
            }
    },
    aliases: ['hackban', 'iban', 'banid', 'idban'],
    description: 'Bans a user via __ID__'
}