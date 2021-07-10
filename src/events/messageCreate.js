const guildPrefixes = {}
const { prefix: globalPrefix } = require('../config.json')
const commandPrefixSchema = require('../schemas/command-prefix-schema')
const antiSpamSchema = require('../schemas/antispam-schema')
const BaseEvent = require('../utils/structures/BaseEvent')

module.exports = class MessageCreate extends BaseEvent {
  constructor() {
    super('messageCreate')
  }

  async run(client, message) {

    if (!message.guild) return
    if (message.author.bot) return

    // eslint-disable-next-line no-unused-vars
    for (const guild of client.guilds.cache) {
      const result = await commandPrefixSchema.findOne({ _id: message.guild.id })
      result == null ? guildPrefixes[message.guild.id] = globalPrefix : guildPrefixes[message.guild.id] = result.prefix
    }

    const prefix = guildPrefixes[message.guild.id] || globalPrefix

    if (message.content == `<@!689678745782714464>`) {
      message.reply({ content: `my prefix is **${prefix}**` })
    }

    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .trim()
        .split(/\s+/)
      const command = client.commands.get(cmdName.toLowerCase())

      if(!command) return

      // Check if user is in cooldown
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Map())
      }

      const now = Date.now()
      const timestamps = client.cooldowns.get(command.name)
      const cooldownAmount = (command.cooldown || 3) * 1000

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

          if (now < expirationTime) {
            // If user is in cooldown
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
          }
        } else {
          timestamps.set(message.author.id, now)
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
          // Execute command
          try {
            command.run(client, message, cmdArgs)
          }
          catch (err) {
            console.error(err);
            message.reply({ content: `Unfortunately, there was an error upon executing this command` })
          }
        }

        // if (command) {

        // }
      }


      const antiSpamChannelQuery = await antiSpamSchema.findOne({
        guildId: message.guild.id,
        channelId: message.channel.id,
      })
      if (antiSpamChannelQuery == null) return
      let antiSpamChannel = antiSpamChannelQuery.channelId
      if (message.channel.id == antiSpamChannel) {
        client.emit('checkMessage', message) // This runs the filter on any message bot receives in any guilds.
      }
    }

  }