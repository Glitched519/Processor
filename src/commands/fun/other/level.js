const { exists } = require('../../../utils/database');

module.exports = {
    run: async(client, message, args) => { 
        const guildId = message.guild.id;
        const memberId = message.member.id;
        const BASE = 5;
        const result = (await exists(guildId, memberId))[0];
        const { experiencePoints, currentLevel } = result[0];
        let levelEmbed = {
            title: message.author.username + "'s Level",
            color: `RANDOM`,
            description: `**XP:** ${experiencePoints}/${Math.floor((BASE * currentLevel) * (Math.pow(Math.E, currentLevel)))}
            **Level:** ${currentLevel}`,
            timestamp: new Date()
        }
        message.channel.send({embed: levelEmbed});
    }, 
    aliases: ['rank'],
    description: 'Shows member level/rank'
}