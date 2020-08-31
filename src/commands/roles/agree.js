const ms = require('ms');

module.exports = {
    run: async(client, message, args) => {
        function agreeSetup(channelId, roleId) {
            if(message.channel.id == channelId) {
                message.delete();
                message.reply(`has agreed to the rules. Enjoy **${message.guild.name}** as member **${message.guild.memberCount}!**`);
                setTimeout(function() {
					message.member.roles.add(roleId);
				}, ms('4s'));
                
            }
        }
        agreeSetup('749968997948063794', '662735947279892501');
        agreeSetup('746041678112227358', '739778037247246356');
        agreeSetup('746739228032892938', '746573802556620850');
    },
    aliases: [],
    description: 'Assigns base role to all who agree'
}
