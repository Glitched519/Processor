const { eventStatus } = require("../../utils/registry");

module.exports = {
    run: async(client, message, args) => {
        let patrolRole = '735215789837385758';
        if (message.guild.id == '662734925707083778') {
            if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                message.channel.send(":x: You do not have permission to patrol.")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
                return;
            }
            if (message.author.presence.status == "online" || "idle" || "dnd") {
                if (message.member.roles.cache.has(patrolRole)) {
                    message.channel.send(`:white_check_mark: **You are already on patrol.**`)
                    .then(msg => {
                        msg.delete({timeout: 4000});
                    });
                    return;
                }
                message.member.roles.add(patrolRole);
                message.reply(`you are now on Patrol.`);
            }     
        } 
        else {
            message.channel.send(":x: **This server does not support patrolling.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
            return;
        }
    },
    aliases: ['on', 'patrol'],
    description: 'Enables patrol role for all online mods and admins'
}