const fs = require('fs');

const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Topic extends BaseCommand {
  constructor() {
    super('topic', 'mod', []);
  }

  run(client, message, args) {
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(":x: **I need the `Manage Channels` permission change the topic of this channel.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.channel.send(":x: **You need the `Manage Channels` permission change the topic of this channel.**")
        .then(msg => {
          msg.delete({ timeout: 4000 });
        });
    }
    if (args.length == 0) return;
    message.channel.setTopic(args.join(" "))
      .then(updated => message.channel.send(`<#${message.channel.id}>'s new topic is **${updated.topic}**.`))
      .catch(console.error);
  }
}