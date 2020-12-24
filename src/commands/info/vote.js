const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Vote extends BaseCommand {
  constructor() {
    super('vote', 'info', []);
  }

  run(client, message, args) {
    let voteEmbed = {
      color: `RANDOM`,
      title: "Upvote Processor!",
      fields: [
        {
          name: 'top.gg',
          value: `[Vote on top.gg!](https://top.gg/bot/689678745782714464/vote)`,
          inline: true
        },
        {
          name: 'discordbotlist.com',
          value: `[Vote on DBL!](https://discordbotlist.com/bots/processor/upvote)`,
          inline: true
        },
        {
          name: 'list-discordbot.cf',
          value: `[Vote on List DiscordBot!](https://list-discordbot.cf/vote/689678745782714464)`,
          inline: true
        },
        {
          name: 'ayblisting.com',
          value: `[View on AYBListing!](https://discordbotlist.com/bots/processor/upvote)`,
          inline: true
        },
        {
          name: 'discord.bots.gg',
          value: `[View on bots.gg!](https://discord.bots.gg/bots/689678745782714464)`,
          inline: true
        },
      ],
      description: 'Voting for Processor will give you the ability to see the beta development and other vote-only perks!',
      footer: `Thanks for all the support :blue_heart:`
    }
    message.channel.send({ embed: voteEmbed });
  }
}