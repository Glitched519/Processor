const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Nukechannel extends BaseCommand {
    constructor() {
        super('nukechannel', 'mod', ['nuke']);
    }

    async run(client, message, args) {
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(":x: **I need the `Manage Channels` permission to nuke this channel.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(":x: **You need the `Manage Channels` permission to nuke this channel.**")
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        try {
            const fetchedChannel = message.mentions.channels.first() || message.channel;
            let fetchedTopic = fetchedChannel.topic;
            const filter = m => m.content == fetchedChannel.id;
            message.channel.send(":warning: Are you sure you wish to delete this channel? Reply within **20 seconds** the `channel ID` to confirm.")
            message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                .then(collected => {
                    fetchedChannel.clone();
                    fetchedChannel.delete();
                    fetchedChannel.setTopic(fetchedTopic)
                        .catch(err => {
                            return;
                        });
                })
                .catch(collected => {
                    return message.channel.send(`:x: **${fetchedChannel}** will not be deleted.`);
                });

        }
        catch (err) {
            message.channel.send(":x: Invalid channel. Argument should be channel name. Ex: `#general-1`.")
        }
    }
}