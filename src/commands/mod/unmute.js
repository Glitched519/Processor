const PREFIX = process.env.PREFIX;
const MUTED_ROLE = process.env.MUTED_ROLE;

module.exports = {
    run: async(client, message, args) => {
        let muteArgs = message.content.substring(PREFIX.length).split(" ");

        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send(":x: You don't have permission to unmute a member.");
        }
        else {
            let memberId = muteArgs[1];//message.content.substring(message.content.indexOf(' ') + 1);
            let member = message.guild.members.cache.get(memberId);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.channel.send(":x: You cannot unmute that user.");
                }
                else {
                    let mutedRole = message.guild.roles.cache.get(MUTED_ROLE);
                    if (mutedRole) {
                        member.roles.remove(mutedRole);
                        message.channel.send(":speaker: User unmuted.");
                    }
                    else {
                        message.channel.send(':x: Muted role not found');
                        console.log(mutedRole);
                    }
                }
            }
            else {
                message.channel.send(':ghost: Member not found.');
            }
        }
    },
    aliases: [],
    description: 'Unmutes a user'
}