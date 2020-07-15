module.exports = {
    run: async(client, message, args) => {
        let mutedRoleId = args;    
        console.log("Muted role set to " + mutedRoleId);
    },
    aliases: [],
    description: 'Shows the creator of this awesome bot'
}