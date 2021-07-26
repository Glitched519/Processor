const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const config = require("./config.json");
const { Webhook } = require("@top-gg/sdk");
const express = require("express");
const { AutoPoster } = require("topgg-autoposter");
const wh = new Webhook(config["webhook-pass"]);
const app = express();

const nonPrivilegedIntents = [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
];

const client = new Client({
    intents: nonPrivilegedIntents,
    restTimeOffset: 0,
    disableMentions: "everyone",
    allowedMentions: {
        repliedUser: false,
    }
    // partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"]
});

(async () => {
    const ap = AutoPoster(config["topgg-token"], client);
    await client.login(config.token).then(() => console.log("Logging In..."));
    console.log("Configuring Client Settings...");
    client.commands = new Map();
    client.events = new Map();
    client.cooldowns = new Map();
    client.prefix = config.prefix;
    await registerCommands(client, "../commands").then(() => console.log("Registering Commands..."));
    await registerEvents(client, "../events").then(() => console.log("Registering Events..."));

    app.post("/webhook", wh.listener((vote) => {
        const botVoteEmbed = new MessageEmbed()
            .setTitle("Someone just voted!")
            .setColor("BLURPLE")
            .setDescription(`<@!${vote.user}> just voted!`)
            .setFooter("Thanks for all your support!");
        const voteRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Vote")
                    .setURL("https://top.gg/bot/689678745782714464/vote")
                    .setStyle("LINK"),
            );

        client.channels.cache.get("782680889628557382").send({ embeds: [botVoteEmbed], components: [voteRow] });
    }));

    app.listen(3000);

    ap.on("error", (err) => {
        console.log(`Stats were not posted due to the following error: ${err}`);
    });

    client.emit("ready");
})();

