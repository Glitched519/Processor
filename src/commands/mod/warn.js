

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: **You don't have permission to warn a member.**");

        let reason = args.slice(23);
        let memberTag = args.split(" ")[0];
        let memberId = memberTag.slice(3, -1);
        let member = client.users.cache.get(memberId);

        let warnEmbed = {
            title: "You've Been Warned",
            color: `#c4f942`,
            description: `You received a warning in ${message.guild.name}.\nReason: ${reason}`,
            timestamp: new Date()
        }

        message.channel.send(`${memberTag} has been warned by ${message.author.tag}\nReason: ${reason}`);
        member.send({embed: warnEmbed});
    },
    aliases: ['warn'],
    description: 'Warns a user'
}  