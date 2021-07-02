const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Nukechannel extends BaseCommand {
    constructor() {
        super('nukechannel', 'mod', ['nuke']);
    }

    async run(client, message) {
        if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: ":x: **I need the `Manage Channels` permission to nuke this channel.**" })
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.channel.send({ content: ":x: **You need the `Manage Channels` permission to nuke this channel.**" })
                .then(msg => {
                    msg.delete({ timeout: 4000 });
                });
        }
        try {
            const fetchedChannel = message.mentions.channels.first() || message.channel;
            let fetchedTopic = fetchedChannel.topic;
            const filter = m => m.content == fetchedChannel.id;
            message.channel.send({ content: ":warning: Are you sure you wish to delete this channel? Reply within **20 seconds** the `channel ID` to confirm." })
            message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                .then(() => {
                    fetchedChannel.clone();
                    fetchedChannel.delete();
                    fetchedChannel.setTopic(fetchedTopic)
                        .catch(() => {
                            return;
                        });
                })
                .catch(() => {
                    return message.channel.send({ content: `:x: **${fetchedChannel}** will not be deleted.` });
                });

        }
        catch (err) {
            message.channel.send({ content: ":x: Invalid channel. Argument should be channel name. Ex: `#general-1`." })
        }
    }
}