const guildPrefixes = {};
const { prefix: globalPrefix } = require("../config.json");
const commandPrefixSchema = require("../schemas/command-prefix-schema");
const logSchema = require("../schemas//logs-schema");
const BaseEvent = require("../utils/structures/BaseEvent");
const { MessageEmbed } = require("discord.js");

module.exports = class MessageUpdate extends BaseEvent {
    constructor() {
        super("messageUpdate");
    }
    async run(client, oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        if (oldMessage.content == newMessage.content) return;

        // eslint-disable-next-line no-unused-vars
        for (const guild of client.guilds.cache) {
            const result = await commandPrefixSchema.findOne({ _id: oldMessage.guild.id });
            result == null ? guildPrefixes[oldMessage.guild.id] = globalPrefix : guildPrefixes[oldMessage.guild.id] = result.prefix;
        }

        const prefix = guildPrefixes[oldMessage.guild.id] || globalPrefix;

        if (newMessage.content == "<@!689678745782714464>") {
            newMessage.reply({ content: `my prefix is **${prefix}**` });
        }

        if (newMessage.content.startsWith(prefix)) {
            const [cmdName, ...cmdArgs] = newMessage.content
                .slice(prefix.length)
                .trim()
                .split(/\s+/);
            const command = client.commands.get(cmdName.toLowerCase());


            if (!command) return;

            // Check if user is in cooldown
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Map());
            }

            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if (timestamps.has(oldMessage.author.id)) {
                const expirationTime = timestamps.get(oldMessage.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    // If user is in cooldown
                    const timeLeft = (expirationTime - now) / 1000;
                    return newMessage.reply(`wait ${timeLeft.toFixed(1)} more second(s) before using \`${command.name}\` again.`)
                        .then(msg => {
                            setTimeout(() => msg.delete(), timeLeft.toFixed(1) * 1000);
                        });
                }
            } else {
                timestamps.set(newMessage.author.id, now);
                setTimeout(() => timestamps.delete(newMessage.author.id), cooldownAmount);
                // Execute command
                try {
                    command.run(client, newMessage, cmdArgs);
                }
                catch (err) {
                    console.error(err);
                    newMessage.reply({ content: "Unfortunately, there was an error upon executing this command." });
                }
            }
        }


        const logChannelQuery = await logSchema.findOne({ _id: oldMessage.guild.id });
        if (logChannelQuery == null) return;
        const logChannel = logChannelQuery.channel;
        let destination = client.channels.cache.get(logChannel.toString());
        if (!destination) return;

        let editedEmbed = new MessageEmbed()
            .setTitle(`Message Edited by ${oldMessage.author.tag}`)
            .setDescription(`**Channel:** <#${oldMessage.channel.id}>\n**Old Message:** ${oldMessage.content}\n**New Message:** ${newMessage.content}\n[**Jump to Message**](https://canary.discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
            .setColor("YELLOW")
            .setTimestamp();

        destination.send({ embeds: [editedEmbed] });
    }
};