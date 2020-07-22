const { eventStatus } = require("../../utils/registry");

module.exports = {
    run: async(client, message, args) => {
        let patrolRole = '735215789837385758';
        if (message.guild.id == '662734925707083778') {
            if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                return message.channel.send(":x: You do not have permission to patrol.")
            }
            if (message.author.presence.status == "online" || "idle" || "dnd") {
                if (message.member.roles.cache.has(patrolRole)) {
                    return message.channel.send(`:white_check_mark: You are already on patrol.`);
                }
                message.member.roles.add(patrolRole);
                message.channel.send(`${message.author.tag} is now on Patrol.`);
            }     
        } 
        else {
            return message.channel.send(":x: This server does not support patrolling.");
        }
    },
    aliases: ['on', 'patrol'],
    description: 'Enables patrol role for all online mods and admins'
}