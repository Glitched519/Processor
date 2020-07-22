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
                const statEmbed = {
                    title: `${member.user.tag} (${member.user.id})`,               
                    description: `**Roles:** ${member.roles.cache.map(role => role.toString())}`,
                    color: `RANDOM`,
                    thumbnail: {
                        url: member.user.displayAvatarURL(),
                    }, 
                    fields : [
                        {
                            name: 'Created On',
                            value: member.user.createdAt.toLocaleString(),
                        },
                        {
                            name: 'Joined On',
                            value: member.joinedAt.toLocaleString(),
                        },
                        {
                            name: 'Voice Channel',
                            value: member.voice.channel ? member.voice.channel.name + ` (${member.voice.channel.id})`: 'None',
                        },
                        {
                            name: 'Nickname',
                            value: member.displayName,
                        },
                        {
                            name: 'Presence',
                            value: member.presence.status,
                        },
                    ]
                }
            message.channel.send({embed: statEmbed});
            }
            else {
                message.channel.send(`No member with ID ${args}`);
            }
        }
        else {
            const { guild } = message;
            const statEmbed = {
                title: `${guild.name} (${guild.id})`,
                description: `**Roles:** ${guild.roles.cache.map(role => role.toString()).slice(10)}`,
                color: `RANDOM`,
                thumbnail: {
                    url: guild.iconURL()
                },
                fields : [
                    {
                        name: 'Created On',
                        value: guild.createdAt.toLocaleString(),
                    },
                    {
                        name: 'Server Owner',
                        value: guild.owner.user.tag,
                    },
                    {
                        name: 'Total Members',
                        value: guild.memberCount,
                        inline: true,
                    },
                    {
                        name: 'Total Real Members',
                        value: guild.members.cache.filter(member => !member.user.bot).size,
                        inline: true,
                    },
                    {
                        name: 'Total Bots',
                        value: guild.members.cache.filter(member => member.user.bot).size,
                        inline: true,
                    },
                    {
                        name: 'Total Channels',
                        value: guild.channels.cache.size,
                        inline: true,
                    },
                    {
                        name: 'Total Text Channels',
                        value: guild.channels.cache.filter(ch => ch.type === 'text').size,
                        inline: true,
                    },
                    {
                        name: 'Total Voice Channels',
                        value: guild.channels.cache.filter(ch => ch.type === 'voice').size,
                        inline: true,
                    },
                ]
            }
            message.channel.send({embed: statEmbed});
        }
    }, 
    aliases: [],
    description: 'Shows the stats of the server or a member'
}