module.exports = {
    run: async(client, message, args) => {
        function agreeSetup(channelId, roleId) {
            if(message.channel.id == channelId) {
                message.member.roles.add(roleId);
                message.delete();
                message.reply(`has agreed to the rules. Enjoy **${message.guild.name}!**`);
            }
        }
        agreeSetup('711192590162199558', '662735947279892501');
        agreeSetup('746041678112227358', '739778037247246356');
        agreeSetup('746739228032892938', '746573802556620850');
    },
    aliases: [],
    description: 'Assigns base role to all who agree'
}
