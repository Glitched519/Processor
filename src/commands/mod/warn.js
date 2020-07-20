

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: **You don't have permission to warn a member.**");

        let reason = args.slice(23);
        let memberTag = args.split(" ")[0];

        let warnEmbed = {
            title: ":warning: Member Warned :warning:",
            color: `#c4f942`,
            description: `**Member:** ${memberTag}\n**Reason: **${reason}`
        }
        message.channel.send({embed: warnEmbed});
    },
    aliases: ['warn'],
    description: 'Warns a user'
}  