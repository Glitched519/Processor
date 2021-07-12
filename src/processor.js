
const { Client } = require('discord.js')
const { registerCommands, registerEvents } = require('./utils/registry')
const config = require('./config.json')
const Topgg = require("@top-gg/sdk")

const api = new Topgg.Api(config["topgg-token"])

const nonPrivilegedIntents = [
    'GUILDS',
    'GUILD_BANS',
    'GUILD_EMOJIS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
]

const client = new Client({
    intents: nonPrivilegedIntents,
    restTimeOffset: 0,
    disableMentions: 'everyone',
    allowedMentions: {
        repliedUser: false,
    }
    // partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
});

(async () => {
    await client.login(config.token).then(() => console.log('Logging In...'))
    console.log('Configuring Client Settings...')
    client.commands = new Map()
    client.events = new Map()
    client.snipes = new Map()
    client.cooldowns = new Map()
    client.prefix = config.prefix
    await registerCommands(client, '../commands').then(() => console.log("Registering Commands..."))
    await registerEvents(client, '../events').then(() => console.log("Registering Events..."))

    setInterval(() => {
        api.postStats({
            serverCount: client.guilds.cache.size,
            shardCount: client.options.shardCount
        })
    }, 1800000) // update every 30 minutes
    console.log("Started Posting Bot Stats on top.gg.")

    console.log("Guilds: %d", client.guilds.cache.size)

    client.emit("ready")
})()

