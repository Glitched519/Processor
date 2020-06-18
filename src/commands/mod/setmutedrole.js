module.exports = {
    run: async(client, message, args) => {
        let mutedRoleId = message.guild.roles.cache.get(args).toString();    
        console.log("Muted role set to " + mutedRoleId);
    },
    aliases: [],
    description: 'Shows the creator of this awesome bot'
}