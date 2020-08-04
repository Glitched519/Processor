const StateManager = require('../../utils/StateManager');
const PREFIX = process.env.PREFIX;

module.exports = {
    run: async(client, message, args) => {
        if (args == `${PREFIX}setmutedrole`) return;

        return StateManager.connection.query(
            `INSERT INTO GuildMutedRole VALUES (
                '${message.guild.id}', '${args}'
            )`
        );    
    },
    aliases: [],
    description: 'Shows the creator of this awesome bot'
}