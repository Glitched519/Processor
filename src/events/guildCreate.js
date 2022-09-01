const BaseEvent = require("../utils/structures/BaseEvent");
const { join } = require("../emojis.json");
const { EmbedBuilder, Colors } = require("discord.js");

module.exports = class GuildCreate extends BaseEvent {
    constructor() {
        super("guildCreate");
    }
    async run(client, guild) {
        if (guild == "901538946222293002" || guild == "901750805948932126") return;
        let destination = client.channels.cache.get("797849546612932668");
        const joinEmbed = new EmbedBuilder()
            .setTitle(`${join} **${guild}** added ${client.user.tag}`)
            .setColor("Green")
            .addFields([
                { name: "Server ID", value: guild.id, inline: true },
                { name: "Member Count", value: `${guild.memberCount}`, inline: true },
            ])
            .setFooter({ text: `Currently in ${client.guilds.cache.size} servers` });
        destination.send({ embeds: [joinEmbed] });
    }
};