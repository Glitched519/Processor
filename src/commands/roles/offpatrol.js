module.exports = {
    run: async(client, message, args) => {
        let patrolRole = '735215789837385758';
        if (message.guild.id == '662734925707083778') {
            if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return;
            if (message.member.roles.cache.has(patrolRole)) {
                message.member.roles.remove(patrolRole);
                message.channel.send(`${message.author.tag} is no longer on patrol.`);   
            }
            else {
                message.channel.send(`:x: You are already off patrol.`);   
            }
        }
        else {
            return message.channel.send(":x: This server does not support patrolling.");
        }
    },
    aliases: ['off', 'offline'],
    description: 'Remove patrol role for offline mods and admins'
}