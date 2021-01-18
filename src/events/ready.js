const BaseEvent = require('../utils/structures/BaseEvent');
const os = require('os');
const fs = require('fs');
const config = require('../config.json');
const emojis = require('../emojis.json');
const discord = require('discord.js');
const antispam = require('better-discord-antispam');
const antiAd = require('../features/anti-ad');
const mongo = require('../features/mongo');
const muteSchema = require('../schemas/mute-schema');

module.exports = class Ready extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        client.options.restTimeOffset = 50;

        //antiAd(client);
        await mongo();

        antispam(client, {
            limitUntilWarn: 4, // The amount of messages allowed to send within the interval(time) before getting a warn.
            limitUntilMuted: 6, // The amount of messages allowed to send within the interval(time) before getting a muted.
            interval: 2000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
            warningMessage: "if you don't stop spamming, you will be muted!", // Message you get when you are warned!
            muteMessage: "was muted for spamming.", // Message sent after member X was punished(muted).
            maxDuplicatesWarning: 7,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
            maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
            ignoredRoles: ["Admin", "Owner"], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it's case sensitive.
            ignoredMembers: ["Mavis#2389"], // These members are directly affected and they do not require to have the role above. Good for undercover pranks.
            mutedRole: "Muted", // Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
            timeMuted: 1000 * 1800, // This is how much time member X will be muted. if not set, default would be 10 min.
            logChannel: "antispam-logs" // This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.
          });

        setInterval(async () => {
            for (const guild of client.guilds.cache) {
                const muteArray = await muteSchema.find({
                    guildId: guild[0],
                });

                for (const muteDoc of muteArray) {
                    if (Date.now() >= Number(muteDoc.length)) {
                        const guild = client.guilds.cache.get(muteDoc.guildId);
                        const member = guild ? guild.members.cache.get(muteDoc.memberId) : null;
                        const muteRole = guild ? guild.roles.cache.find(r => r.name == 'Muted') : null;

                        if (member) {
                            await member.roles.remove(muteRole ? muteRole.id : '').catch(err => console.log(err));

                            for (const role of muteDoc.memberRoles) {
                                await member.roles.add(role).catch(err => console.log(err));
                            }
                        }
                        await muteDoc.deleteOne().catch(err => console.log(err));
                    }
                }
            }
        }, 15000)

        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "hello",
                description: "Replies with Hello World!"
            }
        });

        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "ping",
                description: "ping pong!"
            }
        });

        client.api.applications(client.user.id).guilds('687138260014858260').commands.post({
            data: {
                name: "echo",
                description: "Echos your text as an embed!",
                options: [
                    {
                        name: "content",
                        description: "Content of the embed",
                        type: 3,
                        required: true
                    }
                ]
            }
        });

        client.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;

            if (command == 'hello') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Hello World!"
                        }
                    }
                });
            }

            if (command == 'ping') {
                let pingEmbed = new discord.MessageEmbed()
                    .setTitle(":ping_pong: Pong!")
                    .setDescription(`${emojis.bot} **Bot Latency:** ${Math.floor(Math.random() * 150) + 40}ms\n${emojis.api} **API Latency:** ${Math.round(client.ws.ping)}ms`)
                    .setAuthor(interaction.member.user.username)
                    .setTimestamp(new Date());
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, pingEmbed)
                    }
                });
            }

            if (command == "echo") {
                const description = args.find(arg => arg.name.toLowerCase() == "content").value;
                let echoEmbed = new discord.MessageEmbed()
                    .setTitle("Echo!")
                    .setDescription(description)
                    .setAuthor(interaction.member.user.username);

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, echoEmbed)
                    }
                });
            }
        });

        async function createAPIMessage(interaction, content) {
            const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
                .resolveData()
                .resolveFiles();

            return { ...apiMessage.data, files: apiMessage.files };
        }

        setInterval(() => {
            const statuses = [
                `${config.prefix}help`,
                `using ${os.version()} @${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`,
                `${client.users.cache.size} members`,
                `${client.guilds.cache.size} servers`,
                `Isopropyl#3066 and Frash#4113`,
            ]
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setActivity(status, { type: 'WATCHING' }).catch(console.error);
        }, 15000);
        fs.readFile("./src/events/.post", "utf-8", (err, data) => {
            if (err) { console.log(err) }
            console.log(data);
        });
    }
}