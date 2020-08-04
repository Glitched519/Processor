const StateManager = require('../../utils/StateManager');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        StateManager.connection.query(`SELECT mutedRole FROM GuildSettings WHERE guildId = ${message.guild.id}`, function (err, result, fields) {
            if (err) throw err;
            let muteArgs = message.content.substring(PREFIX.length).split(" ");

        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send(":x: You don't have permission to unmute a member.")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        else {
            let memberId = muteArgs[1];
            let member = message.guild.members.cache.get(memberId);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.channel.send(":x: You cannot unmute that user.")
                    .then(msg => {
                        msg.delete({timeout: 4000});
                    });
                }
                else {
                    let mutedRole = message.guild.roles.cache.get(result[0].mutedRole);
                    if (!member.roles.cache.has(result[0].mutedRole)) {
                        message.channel.send(":x: **User is not muted.**")
                        .then(msg => {
                            msg.delete({timeout: 4000});
                        });
                        return;
                    }
                    if (mutedRole) {
                        member.roles.remove(mutedRole);
                        message.channel.send(":speaker:** User unmuted.**");
                    }
                    else {
                        message.channel.send(':x: **Muted role not found.**');
                        console.log(mutedRole);
                    }
                }
            }
            else {
                message.channel.send(':ghost: **Member not found.**');
            }
        }
        });
        
    },
    aliases: [],
    description: 'Unmutes a user'
}