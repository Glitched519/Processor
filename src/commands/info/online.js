module.exports = {
    run: async (client, message, args) => {
        var onlineCount = message.guild.members.cache.filter(m => m.presence.status === 'online').size;
        message.channel.send(`There are currently **${onlineCount}** members online in ${message.guild.name}.`);
    },
    aliases: [],
    description: 'Gets number of current online members'
}

