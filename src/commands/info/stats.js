const config = require('../../config.json');
const PREFIX = config.prefix;
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Stats extends BaseCommand {
    constructor() {
        super('stats', 'info', []);
    }

    async run(client, message, args) {
        const statArgs = args.length;
        if (statArgs >= 2) {
            message.channel.send({ content: `Incorrect usage: ${PREFIX}stats | ${PREFIX}stats <user_id> | ${PREFIX}stats @mention` })
        }
        else if (statArgs === 1) {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (member) {
                const roleMap = [];
                const statEmbed = {
                    title: `${member.user.tag} (${member.user.id})`,
                    description: `**Roles:** ${member.roles.cache.map(role => role.toString())}`,
                    color: `RANDOM`,
                    thumbnail: {
                        url: member.user.displayAvatarURL({ dynamic: true })
                    },
                    fields: [
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
                            value: member.voice.channel ? member.voice.channel.name + ` (${member.voice.channel.id})` : 'None',
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
                message.channel.send({ embeds: statEmbed });
            }
            else {
                message.channel.send({ content: `No member with ID ${args[0]}` });
            }
        }
        else {
            const roleMap = [];
            const { guild } = message;
            for (let i = 0; i < 20; i++) {
                roleMap.push(guild.roles.cache.map(role => role.toString())[i])
            }
            roleMap.shift();
            const statEmbed = {
                title: `${guild.name} (${guild.id})`,
                description: `**Top 20 Roles:** ${roleMap}`,
                color: `RANDOM`,
                thumbnail: {
                    url: guild.iconURL({ dynamic: true })
                },
                fields: [
                    {
                        name: 'Created On',
                        value: guild.createdAt.toLocaleString(),
                    },
                    {
                        name: 'Server Owner',
                        value: `<@!${guild.ownerID}>`,
                    },
                    {
                        name: 'Total Members',
                        value: guild.memberCount.toString(),
                        inline: true,
                    },
                    {
                        name: 'Total Channels',
                        value: guild.channels.cache.size.toString(),
                        inline: true,
                    },
                    {
                        name: 'Total Text Channels',
                        value: guild.channels.cache.filter(ch => ch.type === 'text').size.toString(),
                    },
                    {
                        name: 'Total Voice Channels',
                        value: guild.channels.cache.filter(ch => ch.type === 'voice').size.toString(),
                        inline: true,
                    },
                ]
            }
            message.channel.send({ embeds: [statEmbed] });
        }
    }
}