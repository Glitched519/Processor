const { default: fetch } = require("node-fetch");

module.exports = {
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) 
            return message.channel.send(":x: **You cannot nuke this channel.**").then(msg => {
            msg.delete({timeout: 4000});
        });
        try {
            let params = args.split(" ");
            let channel = params[0];
            const fetchedChannel = message.guild.channels.cache.find(r => r.name === channel);
            let fetchedTopic = fetchedChannel.topic;
            fetchedChannel.clone();
            fetchedChannel.delete();
            fetchedChannel.setTopic(fetchedTopic);
            message.channel.send(`:fire: **${channel} nuked!**`)
            .then(msg => {
                msg.delete({timeout: 15000});
            });
       }
        catch (err) {
            message.channel.send(":x: **Invalid channel.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
    },
    aliases: ['nuke'],
    description: 'Nukes a channel'
}