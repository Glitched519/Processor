module.exports = {
    run: async(client, message, args) => {
        let roleMap = [];
        const roles = message.member.roles.cache;

        if (!args[0]) {
            var user = message.guild.members.cache.get(message.author.id);
        }
        if (message.guild.members.cache.get(args[0])) {
        var user = message.guild.members.cache.get(args[0]);
        }
        if (args[0].startsWith("<@") && args[0].endsWith(">")) {
        var user = message.guild.members.cache.get(
            message.mentions.users.first().id);
        }

          roles.forEach(roles => {
            roleMap.push(roles);
          });

          let infoEmbed = {
              description: `${roleMap}`
          };
          message.channel.send({ embed: infoEmbed });
    },
    aliases: [],
    description: 'Loads the info of a specific user'
}