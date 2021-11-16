const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class Vote extends BaseCommand {
    constructor() {
        super("vote", "info", []);
    }

    async run(client, message) {
        let voteEmbed = new MessageEmbed()
            .setTitle("Upvote Processor!")
            .setColor("#42C0FB")
            .setDescription("Voting for Processor will give you the ability to see the beta development and other vote-only perks!")
            .setFooter("Thanks for all the support!", message.author.displayAvatarURL());

        const voteRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("discords.com/bots")
                    .setURL(`https://discords.com/bots/bot/${client.user.id}/vote`)
                    .setStyle("LINK"),
                new MessageButton()
                    .setLabel("discord.boats")
                    .setURL(`https://discord.boats/bot/${client.user.id}`)
                    .setStyle("LINK"),
                new MessageButton()
                    .setLabel("discordbotlist.com")
                    .setURL("https://discord.ly/processor")
                    .setStyle("LINK"),
            );

        message.reply({ embeds: [voteEmbed], components: [voteRow] });
    }
};