/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const BaseEvent = require("../utils/structures/BaseEvent");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const os = require("os");
const fs = require("fs");
const path = require("path");
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const antispam = require("better-discord-antispam");
const mongo = require("../features/mongo");
const muteSchema = require("../schemas/mute-schema");
require("dotenv").config();
const guildId = "687138260014858260";

module.exports = class Ready extends BaseEvent {
    constructor() {
        super("ready");
    }
    async run(client, commands) {

        await mongo();

        const eventFiles = fs.readdirSync(path.join(__dirname, "../events")).filter(file => file.endsWith(".js"));

        const animalCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/animal")).filter(file => file.endsWith(".js"));
        const cuteCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/cute")).filter(file => file.endsWith(".js"));
        const imageCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/image")).filter(file => file.endsWith(".js"));
        const infoCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/info")).filter(file => file.endsWith(".js"));
        const mathCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/math")).filter(file => file.endsWith(".js"));
        const modCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/mod")).filter(file => file.endsWith(".js"));
        const otherCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/other")).filter(file => file.endsWith(".js"));
        const ownerCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/owner")).filter(file => file.endsWith(".js"));
        const searchCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/search")).filter(file => file.endsWith(".js"));
        const setupCmdFiles = fs.readdirSync(path.join(__dirname, "../slashcommands/setup")).filter(file => file.endsWith(".js"));

        const cmdFiles = [animalCmdFiles, cuteCmdFiles, imageCmdFiles, infoCmdFiles, mathCmdFiles, modCmdFiles, otherCmdFiles, ownerCmdFiles, searchCmdFiles, setupCmdFiles];
        const dirs = ["animal", "cute", "image", "info", "math", "mod", "other", "owner", "search", "setup"];
        antispam(client, {
            limitUntilWarn: 4, // The amount of messages allowed to send within the interval(time) before getting a warn.
            limitUntilMuted: 6, // The amount of messages allowed to send within the interval(time) before getting a muted.
            interval: 2000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
            warningMessage: "if you don't stop spamming, you will be muted!", // Message you get when you are warned!
            muteMessage: "was muted for spamming.", // Message sent after member X was punished(muted).
            maxDuplicatesWarning: 7,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
            maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
            ignoredRoles: ["Admin", "Owner"], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it"s case sensitive.
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

        const slashcommands = [];

        for (let i = 0; i < cmdFiles.length; i++) {
            cmdFiles[i].forEach(file => {
                const cmd = require(`../slashcommands/${dirs[i]}/${file}`);
                slashcommands.push(cmd.data);
                client.slashcommands.set(cmd.data.name, cmd);
            });
        }

        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            // event.once ?
            // client.once(event.name, (...args) => event.run(...args, commands)) :
            client.on(event.name, (...args) => event.run(...args, slashcommands));
        }

        const CLIENT_ID = client.user.id;

        const rest = new REST({
            version: "9"
        }).setToken(config["bot-token"]);

        (async () => {
            try {
                if (process.env.NODE_ENV === "production") {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: slashcommands
                    });
                    console.log("Successfully registered commands globally.");
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
                        body: slashcommands
                    });
                    console.log("Successfully registered commands locally.");
                }
            } catch (err) {
                if (err) console.error(err);
            }
        })();
    }
};