const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: **You cannot change the topic of this channel.**");
        if(args == `${PREFIX}topic`) return;
        message.channel.setTopic(args);
    },
    aliases: [],
    description: 'Sets the topic for a channel'
}
