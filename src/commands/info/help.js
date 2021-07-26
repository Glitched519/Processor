const guildPrefixes = {};
const fs = require("fs");
const path = require("path");
const { prefix: globalPrefix } = require("../../config.json");
const commandPrefixSchema = require("../../schemas/command-prefix-schema");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

let setupCmds = [];
let modCmds = [];
let mathCmds = [];
let animalCmds = [];
let clashCmds = [];
let cuteCmds = [];
let infoCmds = [];
let searchCmds = [];
let otherCmds = [];

let setupCmdNames = fs.readdirSync(path.join(__dirname, "../setup"));
let modCmdNames = fs.readdirSync(path.join(__dirname, "../mod"));
let mathCmdNames = fs.readdirSync(path.join(__dirname, "../math"));
let animalCmdNames = fs.readdirSync(path.join(__dirname, "../animal"));
let clashCmdNames = fs.readdirSync(path.join(__dirname, "../clash"));
let cuteCmdNames = fs.readdirSync(path.join(__dirname, "../cute"));
let infoCmdNames = fs.readdirSync(path.join(__dirname, "../info"));
let searchCmdNames = fs.readdirSync(path.join(__dirname, "../search"));
let otherCmdNames = fs.readdirSync(path.join(__dirname, "../other"));

setupCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    setupCmds.push(cmd);
});
modCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    modCmds.push(cmd);
});
mathCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    mathCmds.push(cmd);
});
animalCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    animalCmds.push(cmd);
});
clashCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    clashCmds.push(cmd);
});
cuteCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    cuteCmds.push(cmd);
});
infoCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    infoCmds.push(cmd);
});
searchCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    searchCmds.push(cmd);
});
otherCmdNames.forEach(cmd => {
    cmd = cmd.slice(0, cmd.indexOf(".js"));
    otherCmds.push(cmd);
});


module.exports = class Help extends BaseCommand {
    constructor() {
        super("help", "info", ["h"]);
    }

    async run(client, message, args) {

        let page = 1;

        // eslint-disable-next-line no-unused-vars
        for (const guild of client.guilds.cache) {
            const result = await commandPrefixSchema.findOne({ _id: message.guild.id });
            if (result == null) {
                guildPrefixes[message.guild.id] = globalPrefix;
            }
            else {
                guildPrefixes[message.guild.id] = result.prefix;
            }
        }
        const PREFIX = guildPrefixes[message.guild.id] || globalPrefix;

        let helpEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Need some help?")
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(":wrench: Setup", "Configure the bot in your server.\n`Manage Server` permission is required.")
            .addField(":shield: Moderation", "Manages server members.")
            .addField(":cat: Animal", "Learn about animals.")
            .addField(":crossed_swords: Clash", "Look up Clash of Clans related things.")
            .addField(":blue_heart: Cute", "Adore a member.")
            .addField(":1234: Math", "Play with numbers.")
            .addField(":information_source: Info", "Get information about a user or the server.")
            .addField(":mag_right: Search", "Search some cool stuff from the bot!")
            .addField(":o: Other", "Play with other commands.");

        let setupEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Setup Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${setupCmds.join("\n")}\``);

        let modEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Moderation Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${modCmds.join("\n")}\``);

        let mathEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Math Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${mathCmds.join("\n")}\``);

        let animalEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Animal Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${animalCmds.join("\n")}\``);

        let clashEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Clash Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${clashCmds.join("\n")}\``);

        let cuteEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Cute Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${cuteCmds.join("\n")}\``);

        let infoEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Info Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${infoCmds.join("\n")}\``);

        let searchEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Search Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${searchCmds.join("\n")}\``);

        let otherEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Other Commands")
            .setURL("https://processorbot.xyz/commands/")
            .setDescription(`\`${otherCmds.join("\n")}\``);

        let allEmbeds = [helpEmbed, setupEmbed, modEmbed, animalEmbed, clashEmbed, cuteEmbed, mathEmbed, infoEmbed, searchEmbed, otherEmbed];
        let maxPages = allEmbeds.length;

        const helpRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Home")
                    .setCustomId("Home")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("Prev")
                    .setCustomId("Prev")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setLabel("Next")
                    .setCustomId("Next")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setLabel("End")
                    .setCustomId("End")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("Close")
                    .setCustomId("CloseHelp")
                    .setStyle("DANGER"),
            );

        function gotoPage(msg, page) {
            for (let i = 0; i < maxPages + 1; i++) {
                switch (page) {
                    case i:
                        allEmbeds[i - 1].setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                        msg.edit({ embeds: [allEmbeds[i - 1]], components: [helpRow] });
                        break;
                }
            }
        }

        switch (args[0]) {
            case "setup":
                return message.reply({ embeds: [setupEmbed] });
            case "mod":
                return message.reply({ embeds: [modEmbed] });
            case "animal":
                return message.reply({ embeds: [animalEmbed] });
            case "clash":
                return message.reply({ embeds: [clashEmbed] });
            case "cute":
                return message.reply({ embeds: [cuteEmbed] });
            case "math":
                return message.reply({ embeds: [mathEmbed] });
            case "info":
                return message.reply({ embeds: [infoEmbed] });
            case "search":
                return message.reply({ embeds: [searchEmbed] });
            case "other":
                return message.reply({ embeds: [otherEmbed] });
        }

        helpEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
        message.reply({ embeds: [helpEmbed], components: [helpRow] }).then(msg => {
            client.on("interactionCreate", interaction => {
                switch (interaction.customId) {
                    case "Home":
                        page = 1;
                        break;
                    case "Prev":
                        page <= 1 ? page = 1 : page--;
                        break;
                    case "Next":
                        page >= maxPages ? page = maxPages : page++;
                        break;
                    case "End":
                        page = maxPages;
                        break;
                    case "CloseHelp":
                        return msg.delete();
                    default:
                        page = 1;
                        break;
                }
                interaction.defer().then(() => {
                    interaction.deleteReply();
                });

                gotoPage(msg, page);
            });
        });
    }
};