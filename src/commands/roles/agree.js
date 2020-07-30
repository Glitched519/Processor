module.exports = {
    run: async(client, message, args) => {
        if(message.channel.id == '711192590162199558') {
            const loungeMemberRole = '662735947279892501';
            message.member.roles.add(loungeMemberRole);
            message.delete();
            message.reply(`has agreed to the rules. Enjoy ${message.guild.name}!`)
        }
    },
    aliases: [],
    description: 'Assigns Lounge Members role to all who agree'
}
