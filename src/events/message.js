const guildPrefixes = {};
const { prefix: globalPrefix } = require('../config.json');
const commandPrefixSchema = require('../schemas/command-prefix-schema');
const antiSpamSchema = require('../schemas/antispam-schema');
const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class Message extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (!message.guild) return;
        if (message.author.bot) return;

        for (const guild of client.guilds.cache) {
            const result = await commandPrefixSchema.findOne({ _id: message.guild.id });
            result == null ? guildPrefixes[message.guild.id] = globalPrefix : guildPrefixes[message.guild.id] = result.prefix;
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
            const command = client.commands.get(cmdName.toLowerCase());
            if (command) {
                try {
                    command.run(client, message, cmdArgs);
                }
                catch (err) {
                    message.reply(`Unfortunately, there was an error upon executing this command: \`\`\`${err}\`\`\``);
                }
            }
        }

        const antiSpamChannelQuery = await antiSpamSchema.findOne({ 
            guildId: message.guild.id,
            channelId: message.channel.id,
        });
        if (antiSpamChannelQuery == null) return;
        let antiSpamChannel = antiSpamChannelQuery.channelId;
        if (message.channel.id == antiSpamChannel) {
            client.emit('checkMessage', message); // This runs the filter on any message bot receives in any guilds.
        }
    }
}