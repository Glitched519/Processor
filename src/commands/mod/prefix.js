const commandPrefixSchema = require('../../schemas/command-prefix-schema');
const mongo = require('../../features/mongo');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Prefix extends BaseCommand {
    constructor() {
        super('prefix', 'prefix', []);
    }

    async run(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send('You need the `Manage Server` permission to change my prefix.');
        }
        if (!args[0]) {
            return message.reply(`you need to state the prefix to change to.`);
        }
        await mongo().then(async mongoose => {
                const guildId = message.guild.id;
                const prefix = args[0];

                await commandPrefixSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    prefix
                }, {
                    upsert: true
                });

                message.reply(`my prefix is now \`${prefix}\``);
        });
    }
}