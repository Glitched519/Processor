/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const BaseEvent = require("../utils/structures/BaseEvent");
const os = require("os");
const fs = require("fs");
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const antispam = require("better-discord-antispam");
const mongo = require("../features/mongo");
const muteSchema = require("../schemas/mute-schema");
const guildId = "687138260014858260";

module.exports = class Ready extends BaseEvent {
    constructor() {
        super("ready");
    }
    async run(client) {

        await mongo();

        antispam(client, {
            limitUntilWarn: 4, // The amount of messages allowed to send within the interval(time) before getting a warn.
            limitUntilMuted: 6, // The amount of messages allowed to send within the interval(time) before getting a muted.
            interval: 2000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
            warningMessage: "if you don't stop spamming, you will be muted!", // Message you get when you are warned!
            muteMessage: "was muted for spamming.", // Message sent after member X was punished(muted).
            maxDuplicatesWarning: 7,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
            maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
            ignoredRoles: ["Admin", "Owner"], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it"s case sensitive.
            ignoredMembers: ["Isopropyl#9371"], // These members are directly affected and they do not require to have the role above. Good for undercover pranks.
            mutedRole: "Muted", // Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
            timeMuted: 1000 * 600, // This is how much time member X will be muted. if not set, default would be 10 min.
            logChannel: "antispam-logs" // This is the channel where every report about spamming goes to. If it"s not set up, it will attempt to create the channel.
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
                        const muteRole = guild ? guild.roles.cache.find(r => r.name == "Muted") : null;

                        if (member) {
                            await member.roles.remove(muteRole ? muteRole.id : "").catch(err => console.log(err));

                            for (const role of muteDoc.memberRoles) {
                                await member.roles.add(role).catch(err => console.log(err));
                            }
                        }
                        await muteDoc.deleteOne().catch(err => console.log(err));
                    }
                }
            }
        }, 15000);

        setInterval(() => {
            const statuses = [
                `${config.prefix}help`,
                `using ${os.version()} @${Number.parseFloat(os.cpus()[0].speed / 1000).toPrecision(2)} GHz`,
                "UltraSarker#8505",
            ];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setActivity(status, { type: "WATCHING" });
        }, 15000);
        fs.readFile("./src/events/.post", "utf-8", (err, data) => {
            if (err) { 
                console.log(err);
            }
            console.log(data);
        });

        const getApp = () => {
            const app = client.api.applications(client.user.id);
            if (guildId) {
                app.guilds(guildId);
            }
            return app;
        };


        // Slash Commands
        const commands = await getApp(guildId).commands.get();

        await getApp(guildId).commands.post({
            data: {
                name: "ping",
                description: "A simple ping pong command",
            },
        });

        await getApp(guildId).commands();

        await getApp(guildId).commands.post({
            data: {
                name: "embed",
                description: "Displays an embed",
                options: [
                    {
                        name: "name",
                        description: "Your name",
                        required: true,
                        type: 3 // string
                    },
                    {
                        name: "age",
                        description: "Your age",
                        required: false,
                        type: 4 // integer
                    }
                ]
            }
        });
        await getApp(guildId).commands("793286444990726150").delete();
        await getApp(guildId).commands("793286446583775262").delete();

        client.ws.on("INTERACTION_CREATE", async (interaction) => {
            const { name, options } = interaction.data;

            const command = name.toLowerCase();

            const args = {};

            if (options) {
                for (const option of options) {
                    const { name, value } = option;
                    args[name] = value;
                }
            }


            if (command === "ping") {
                reply(interaction, "pong");

            } else if (command === "embed") {
                const embed = new MessageEmbed()
                    .setTitle("Example Embed");

                for (const arg of args) {
                    const value = args[arg];
                    embed.addField(arg, value);
                }
            }
        });

        const reply = async (interaction, response) => {
            let data = {
                content: response,
            };

            if (typeof response === "object") {
                data = await createAPIMessage(interaction, response);
            }

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data,
                }
            });
        };

        const createAPIMessage = async (interaction, content) => {
            const { data, files } = await discord.APIMessage.create(
                client.channels.resolve(interactions.channel_id),
                content
            )
                .resolveData()
                .resolveFiles();

            return { ...data, files };
        };

        await client.api.applications(client.user.id);
    }
};