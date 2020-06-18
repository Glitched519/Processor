const ms = require('ms');
const mrId = require('./setmutedrole');
const PREFIX = process.env.PREFIX;
const MUTED_ROLE = process.env.MUTED_ROLE;

module.exports = {
    run: async(client, message, args) => {
        let muteArgs = message.content.substring(PREFIX.length).split(" ");
        let time = muteArgs[2];
        if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send(":x: **You don't have permission to mute a member.**");
        }
        else {
            let memberId = muteArgs[1];//message.content.substring(message.content.indexOf(' ') + 1);
            let member = message.guild.members.cache.get(memberId);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')) {
                    message.channel.send(":x: **You cannot mute that user.**");
                }
                else {
                    let mutedRole = message.guild.roles.cache.get(MUTED_ROLE);
                    if (mutedRole) {
                        if (!time) {
                            member.roles.add(mutedRole);    
                            message.channel.send(":mute: **User muted indefinitely.**");
                        } 
                        else {
                            member.roles.add(mutedRole);
                            message.channel.send(`:mute: User muted for ${ms(ms(time))}.`);
                            setTimeout(function() {
                                member.roles.remove(mutedRole);
                                message.channel.send(":speaker: User unmuted.");
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
    },
    aliases: [],
    description: 'Mutes a user'
}