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
            .addField('ayblisting.com', `[View on AYBListing!](https://ayblisting.com/bots/689678745782714464)`)
            .addField('discord.bots.gg', `[View on bots.gg!](https://discord.bots.gg/bots/689678745782714464)`)
            .setFooter(`Thanks for all the support!`, message.author.displayAvatarURL())

        message.channel.send(voteEmbed);
    }
}