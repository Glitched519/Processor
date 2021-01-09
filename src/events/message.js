const mongo = require('../features/mongo');
const guildPrefixes = {};
const { prefix: globalPrefix } = require('../config.json');
const commandPrefixSchema = require('../schemas/command-prefix-schema');
const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class Message extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (message.author.bot) return;
        for (const guild of client.guilds.cache) {
            const result = await commandPrefixSchema.findOne({ _id: message.guild.id });
            if (result == null) {
                guildPrefixes[message.guild.id] = globalPrefix;
            }
            else {
                guildPrefixes[message.guild.id] = result.prefix;
            }
        }
        const prefix = guildPrefixes[message.guild.id] || globalPrefix;
        if (message.content == `<@!689678745782714464>`) {
            message.reply(`my prefix is **${prefix}**`);
        }
        if (message.content.startsWith(prefix)) {
            const [cmdName, ...cmdArgs] = message.content
                .slice(prefix.length)
                .trim()
                .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
            }
        }
    }
}