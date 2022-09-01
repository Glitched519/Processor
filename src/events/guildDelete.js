const BaseEvent = require("../utils/structures/BaseEvent");
const { leave } = require("../emojis.json");
const { EmbedBuilder, Colors } = require("discord.js");

module.exports = class GuildDelete extends BaseEvent {
    constructor() {
        super("guildDelete");
    }
    async run(client, guild) {
        if (guild == "901538946222293002" || guild == "901750805948932126") return;
        let destination = client.channels.cache.get("797849546612932668");
        const leaveEmbed = new EmbedBuilder()
            .setTitle(`${leave} **${guild}** removed ${client.user.tag}`)
            .setColor("Red")
            .addFields([
                { name: "Server ID", value: guild.id, inline: true },
                { name: "Member Count", value: `${guild.memberCount}`, inline: true },
            ])
            .setFooter({ text: `Currently in ${client.guilds.cache.size} servers` });
        destination.send({ embeds: [leaveEmbed] });
    }
};