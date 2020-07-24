const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            message.channel.send(":x: **You don't have permission to change the slowmode.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        if (args.startsWith(`${PREFIX}slow`)) {
            message.reply('the slowmode is **' + message.channel.rateLimitPerUser + ' seconds.**');
        }
        else {
            if (isNaN(args)) {
                message.reply("That is not a number.")
                .then(msg => {
                    msg.delete({timeout: 4000});
                });
            }
            else {
                message.channel.setRateLimitPerUser(args, "");
                message.channel.send("Slowmode set to **" + args + ' seconds.**')
            }
        }
    },
    aliases: ['slow'],
    description: 'Sets the slowmode of a channel in seconds'
}