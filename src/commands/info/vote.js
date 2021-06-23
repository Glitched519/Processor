const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Vote extends BaseCommand {
    constructor() {
        super('vote', 'info', []);
    }

    async run(client, message, args) {
        let voteEmbed = new MessageEmbed()
            .setTitle("Upvote Processor!")
            .setColor(`#42C0FB`)
            .setDescription('Voting for Processor will give you the ability to see the beta development and other vote-only perks!')
            .setThumbnail('https://petridish.pw/engine/img/pvp-up.png')
            .addField('top.gg', `[Vote on top.gg!](https://top.gg/bot/689678745782714464/vote)`)
            .addField('discord.boats', `[Vote on discord.boats!](https://discord.boats/bot/689678745782714464)`)
            .addField('discordbotlist.com', `[Vote on DBL!](https://discordbotlist.com/bots/processor/upvote)`)
            .addField('botsfordiscord.com', `[Vote on botsfordiscord.com!](https://botsfordiscord.com/bot/689678745782714464/vote)`)
            .setFooter(`Thanks for all the support!`, message.author.displayAvatarURL())

        // let topggButton = new MessageButton()
        //     .setStyle('url')
        //     .setLabel('top.gg')
        //     .setURL('https://top.gg/bot/689678745782714464/vote')

        // let discordBoatsButton = new MessageButton()
        //     .setStyle('url')
        //     .setLabel('discord.boats')
        //     .setURL('https://discord.boats/bot/689678745782714464')

        // let discordBotListButton = new MessageButton()
        //     .setStyle('url')
        //     .setLabel('discordbotlist.com')
        //     .setURL('https://discordbotlist.com/bots/processor/upvote')

        // let botsForDiscordButton = new MessageButton()
        //     .setStyle('url')
        //     .setLabel('botsfordiscord.com')
        //     .setURL('https://botsfordiscord.com/bot/689678745782714464/vote')



        message.channel.send({ embeds: [voteEmbed] });
        // message.channel.send({ content: { buttons: [topggButton, discordBoatsButton, discordBotListButton, botsForDiscordButton] }});
    }
}