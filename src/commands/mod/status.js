module.exports = {
    run: async(client, message, args) => { 
        if (!message.member.hasPermission('MANAGE_SERVER')) {
            message.channel.send(":x: You don't have permission to change my status.");
        }

        client.user.setActivity(args, {type: 'WATCHING'}).catch(console.error);
    },
    aliases: [],
    description: 'Changes bot status'
}