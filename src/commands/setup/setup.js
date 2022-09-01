const logsSchema = require("../../schemas/antispam-schema");
const welcomeSchema = require("../../schemas/welcome-schema");

module.exports = {
    data: {
        name: "setup",
        description: "Setup server settings.",
        options: [
            {
                type: 1,
                name: "anti-spam",
                description: "Anti-spam to prevent spam interactions in a channel.",
                options: [
                    {
                        type: 7,
                        name: "channel",
                        description: "Anti-spam channel.",
                        required: true
                    }
                ]
            },
            {
                type: 1,
                name: "logging",
                description: "Log any events into a specific channel.",
                options: [
                    {
                        type: 7,
                        name: "channel",
                        description: "Logging Channel.",
                        required: true
                    }
                ]
            },
            {
                type: 1,
                name: "welcome",
                description: "Greet new members who join.",
                options: [
                    {
                        type: 7,
                        name: "channel",
                        description: "Channel to show welcome interactions.",
                        required: true
                    }
                ]
            }
        ]
    },
    async run(client, interaction) {
        const channel = interaction.options.getChannel("channel");
        const subCmd = interaction.options._subcommand;
        const guildId = interaction.guild.id;

        if (!interaction.memberPermissions.has("MANAGE_GUILD")) {
            return await interaction.reply({ content: "You need the `Manage Server` permission to use setup commands.", ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has("MANAGE_GUILD")) {
            return await interaction.reply({ content: "I need the `Manage Server` permission to use setup commands." });
        }

        switch (subCmd) {
            case "anti-spam":
                await logsSchema.findOneAndUpdate({
                    guildId,
                    channelId: channel,
                }, {
                    guildId,
                    channelId: channel,
                }, {
                    upsert: true
                });

                await interaction.reply({ content: `${channel} now disallows any incoming spam interactions from other members.` });
                break;
            case "logging":

                await logsSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    channel: channel
                }, {
                    upsert: true
                });

                await interaction.reply({ content: `the log channel is now ${channel}` });
                break;
            case "welcome":
                await welcomeSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    channel: channel
                }, {
                    upsert: true
                });

                await interaction.reply({ content: `Welcome channel set as ${channel}.` });
                break;
        }
    }
};