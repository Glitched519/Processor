module.exports = {
    run: async(client, message, args) => {
        let firstMember = args.split(' ');
        if (!message.member.hasPermission(['CHANGE_NICKNAME', 'MANAGE_NICKNAMES'])) {
            return message.channel.send(":x: **You do not have permission to change a member's nickname.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        const newNickname = args.substring(args.indexOf(' ')+ 1);
        const member = message.mentions.members.first() || message.guild.members.cache.get(firstMember[0]);  
        if (!member) {
            return message.channel.send(":x: **You need to specify an existing member.**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        if (!firstMember[0]) {
            return message.channel.send(":grey_question: **What nickname do you want to assign this member?**")
            .then(msg => {
                msg.delete({timeout: 4000});
            });
        }
        member.setNickname(newNickname);
    },
    aliases: ['nick', 'name'],
    description: 'Changes the nickname of a user'
}