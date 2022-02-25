const BaseEvent = require("../utils/structures/BaseEvent");
const { join } = require("../emojis.json");
const { MessageEmbed } = require("discord.js");

module.exports = class GuildCreate extends BaseEvent {
    constructor() {
        super("guildCreate");
    }
    async run(client, guild) {
        if (guild == "901538946222293002" || guild == "901750805948932126") return;
        let destination = client.channels.cache.get("797849546612932668");
        const joinEmbed = new MessageEmbed()
            .setTitle(`${join} **${guild}** added ${client.user.tag}`)
            .setColor("GREEN")
            .addField("Server ID", guild.id, true)
            .addField("Member Count", `${guild.memberCount}`, true)
            .setFooter(`Currently in ${client.guilds.cache.size} servers`);
        destination.send({ embeds: [joinEmbed] });
    }
};