const { MessageEmbed } = require('discord.js');

module.exports = {
    run: async(client, message, args) => {
        const statArgs = args.split(" ");
        if(statArgs.length >= 2) {
            message.channel.send("Incorrect usage: $stats | $stats <user_id> | $stats @mention ")
        }
        else if(statArgs.length === 1 && args !== "$stats") {
            const member = message.mentions.members.size === 1 ? 
                message.mentions.members.first() : 
                message.guild.members.cache.get(args);
            if(member) {
                const statEmbed = new MessageEmbed()
                .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL()) 
                .setThumbnail(member.user.avatarURL())
                .addField('Created On', member.user.createdAt.toLocaleString())
                .addField('Joined On', member.joinedAt.toLocaleString())
                .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + ` (${member.voice.channel.id})`: 'None')
                .addField('Presence', member.presence.status)       
                .setDescription(`**Roles:** ${member.roles.cache.map(role => role.toString())}`);
            message.channel.send(statEmbed);
            }
            else {
                message.channel.send(`No member with ID ${args}`);
            }
        }
        else {
            const { guild } = message;
            const statEmbed = new MessageEmbed()
                .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL()) 
                .setThumbnail(guild.iconURL())
                .addField('Created On', guild.createdAt.toLocaleString()) 
                .addField('Server Owner', guild.owner.user.tag)  
                .addField('Total Members', guild.memberCount, true) 
                .addField('Total Real Members', guild.members.cache.filter(member => !member.user.bot).size, true) 
                .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
                .addField('Total Channels', guild.channels.cache.size, true)
                .addField('Total Text Channels', guild.channels.cache.filter(ch => ch.type === 'text').size ,true)
                .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
                .setDescription(`**Roles:** ${guild.roles.cache.map(role => role.toString())}`);
            message.channel.send(statEmbed);
        }
    }, 
    aliases: [],
    description: 'Shows the stats of the server or a member'
}