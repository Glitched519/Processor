const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        if (!message.member.hasPermission(['MANAGE_CHANNELS'])) {
            return message.channel.send(":x: **You don't have permission to change the slowmode.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        if (args.startsWith(`${PREFIX}slow`)) {
            return message.reply('the slowmode is **' + message.channel.rateLimitPerUser + ' seconds.**');
        }
        else {
            if (isNaN(args)) {
                return message.reply("That is not a number.")
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