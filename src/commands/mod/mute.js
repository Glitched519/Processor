const StateManager = require('../../utils/StateManager');

const ms = require('ms');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        StateManager.connection.query(`SELECT mutedRole FROM GuildMutedRole WHERE guildId = ${message.guild.id}`, function (err, result, fields) {
            if (err) throw err;
            let muteArgs = message.content.substring(PREFIX.length).split(" ");
        let time = muteArgs[2];
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send(":x: **You don't have permission to mute a member.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        else {
            let memberId = muteArgs[1];
            let member = message.guild.members.cache.get(memberId);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.channel.send(":x: **You cannot mute that user.**")
                    .then(msg => {
                        msg.delete({timeout: 4000});
                    });
                }
                else {
                    let mutedRole = message.guild.roles.cache.get(result[0].mutedRole);
                    if (mutedRole) {
                        if (!time) {
                            member.roles.add(mutedRole);    
                            message.channel.send(":mute: **User muted indefinitely.**");
                        } 
                        else {
                            member.roles.add(mutedRole);
                            message.channel.send(`:mute: **User muted for ${ms(ms(time))}.**`);
                            setTimeout(function() {
                                if (member.roles.cache.has(result[0].mutedRole)) {
                                    member.roles.remove(mutedRole);
                                    message.channel.send(":speaker: **User unmuted.**");     
                                }                       
                            }, ms(time));
                        }
                        
                    }
                    else {
                        message.channel.send(':x: Muted role not found.');
                    }
                }
            }
            else {
                message.channel.send(':ghost: Member not found.');
            }
        }
          });
        
    },
    aliases: [],
    description: 'Mutes a user'
}