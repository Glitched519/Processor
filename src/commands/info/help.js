const guildPrefixes = {};
const { prefix: globalPrefix } = require('../../config.json');
const commandPrefixSchema = require('../../schemas/command-prefix-schema');
const { MessageEmbed } = require('discord.js');
const { setupDef, modDef, mathDef, animalDef, clashDef, cuteDef, infoDef, otherDef } = require('../../defs');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Help extends BaseCommand {
    constructor() {
        super('help', 'info', []);
    }

    async run(client, message, args) {
        let page = 1;
        let maxPages = 9;

        for (const guild of client.guilds.cache) {
            const result = await commandPrefixSchema.findOne({ _id: message.guild.id });
            if (result == null) {
                guildPrefixes[message.guild.id] = globalPrefix;
            }
            else {
                guildPrefixes[message.guild.id] = result.prefix;
            }
        }
        const PREFIX = guildPrefixes[message.guild.id] || globalPrefix;

        let helpClosed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle(`Help Closed`)
            .setDescription('Deleting this embed in 5 seconds...');

        let helpFallbackEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Need some help?')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.\n{required} [optional]`)
            .addField(':shield: Moderation  `mod`', 'Manages server members.')
            .addField(':cat: Animal  `animal`', 'Learn about animals.')
            .addField(':crossed_swords: Clash  `clash`', 'Look up Clash of Clans related things.')
            .addField(':blue_heart: Cute  `cute`', 'Adore a member.')
            .addField(':1234: Math  `math`', 'Play with numbers.')
            .addField(':information_source: Info  `info`', 'Get information about a user or the server.')
            .addField(':o: Other  `other`', 'Play with other commands.')

        let helpEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Need some help?')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.\n{required} [optional]`)
            .addField(':shield: Moderation', 'Manages server members.')
            .addField(':cat: Animal', 'Learn about animals.')
            .addField(':crossed_swords: Clash', 'Look up Clash of Clans related things.')
            .addField(':blue_heart: Cute', 'Adore a member.')
            .addField(':1234: Math', 'Play with numbers.')
            .addField(':information_source: Info', 'Get information about a user or the server.')
            .addField(':o: Other', 'Play with other commands.')

        let setupEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Setup Commands')
            .setDescription(`Only members with the \`Manage Server\` permission such as mod or admin, can use these commands. Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':interrobang: prefix `{new prefix}`', `${setupDef.prefix.description}`)
            .addField(':speech_left: setlogschannel `{#channel}`', `${setupDef.setlogschannel.description}.\nAliases: [${setupDef.setlogschannel.aliases}]`)

        let modEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Moderation Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':shield: permissions', `${modDef.permissions.description}.\nAliases: [${modDef.permissions.aliases}]`)
            .addField(':hammer_pick: __user__ban `{@member} [reason]`', `${modDef.userban.description}.\nAliases: [${modDef.userban.aliases}]`)
            .addField(':boot: __user__kick `{@member} [reason]`', `${modDef.userkick.description}.\nAliases: [${modDef.userkick.aliases}]`)
            .addField(':broom: purge `{number}`', `${modDef.purge.description}.\nAliases: [${modDef.purge.aliases}]`)
            .addField(':clock10: slowmode `[number]`', `${modDef.slowmode.description}.\nAliases: [${modDef.slowmode.aliases}]`)
            .addField(':hammer_pick: __id__ban `{@id} [reason]`', `${modDef.idban.description}.\nAliases: [${modDef.idban.aliases}]`)
            .addField(':boot: __id__kick `{@id} [reason]`', `${modDef.idkick.description}.\nAliases: [${modDef.idkick.aliases}]`)
            .addField(':warning: warn `{@member} [reason]`', `${modDef.warn.description}.\nAliases: [${modDef.warn.aliases}]`)

        let mathEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Math Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':1234: base32 `{number}`', `${mathDef.base32.description}.\nAliases: [${mathDef.base32.aliases}]`)
            .addField(':1234: base64 `{number}`', `${mathDef.base64.description}.\nAliases: [${mathDef.base64.aliases}]`)
            .addField(':1234: binary `{number}`', `${mathDef.binary.description}.\nAliases: [${mathDef.binary.aliases}]`)
            .addField(':computer: calculate `{expression}`', `${mathDef.calculate.description}.\nAliases: [${mathDef.calculate.aliases}]`)
            .addField(':capital_abcd: hexadecimal `{number}`', `${mathDef.hexadecimal.description}.\nAliases: [${mathDef.hexadecimal.aliases}]`)

        let animalEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Animal Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':information_source: animalfact `{animal}`', `${animalDef.animalfact.description}.\nAliases: [${animalDef.animalfact.aliases}]`)
            .addField(':frame_photo: animalimage `{animal}`', `${animalDef.animalimage.description}.\nAliases: [${animalDef.animalimage.aliases}]`)

        let clashEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Clash Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':green_square: baselayout `{th/bh level}`', `${clashDef.baselayout.description}.\nAliases: [${clashDef.baselayout.aliases}]`)
            .addField(':information_source: clashtips `[index]`', `${clashDef.clashtips.description}.\nAliases: [${clashDef.clashtips.aliases}]`)
            .addField(':mag: searchclan `{#tag}', `${clashDef.searchclan.description}.\nAliases: [${clashDef.searchclan.aliases}]`)
            .addField(':mag: searchplayer `{#tag}', `${clashDef.searchplayer.description}.\nAliases: [${clashDef.searchplayer.aliases}]`)

        let cuteEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Cute Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':hugging: hug `{@member}`', `${cuteDef.hug.description}.`)
            .addField(':open_hands: pat `{@member}`', `${cuteDef.pat.description}.`)
            .addField(':wink: wink `{@member}`', `${cuteDef.wink.description}.`)

        let infoEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Info Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':man_construction_worker: author', `${infoDef.author.description}.\nAliases: [${infoDef.author.aliases}]`)
            .addField(':frame_photo: avatar `[@member]`', `${infoDef.avatar.description}.\nAliases: [${infoDef.avatar.aliases}]`)
            .addField(':mask: covid19 `[country]`', `${infoDef.covid19.description}.\nAliases: [${infoDef.covid19.aliases}]`)
            .addField(':book: definition `{word}`', `${infoDef.definition.description}.\nAliases: [${infoDef.definition.aliases}]`)
            .addField(':computer: docs `{query}`', `${infoDef.docs.description}.\nAliases: [${infoDef.docs.aliases}]`)
            .addField(':frame_photo: giphygif `{search}`', `${infoDef.giphygif.description}.\nAliases: [${infoDef.giphygif.aliases}]`)
            .addField(':link: github', `${infoDef.github.description}.\nAliases: [${infoDef.github.aliases}]`)
            .addField(':mag: googleimage `{search}`', `${infoDef.googleimage.description}.\nAliases: [${infoDef.googleimage.aliases}]`)
            .addField(':link: invite', `${infoDef.invite.description}.\nAliases: [${infoDef.invite.aliases}]`)
            .addField(':musical_note: lyrics `{song}`', `${infoDef.lyrics.description}.\nAliases: [${infoDef.lyrics.aliases}]`)
            .addField(':mobile_phone: phone `{phone name}`', `${infoDef.phone.description}.`)
            .addField(':exclamation: ping', `${infoDef.ping.description}.\nAliases: [${infoDef.ping.aliases}]`)
            .addField(':dog2: pokemon `{pokemon}`', `${infoDef.pokemon.description}.\nAliases: [${infoDef.pokemon.aliases}]`)
            .addField(':information_source: poll `{question}`', `${infoDef.poll.description}.`)
            .addField(':information_source: stats `[@member]`', `${infoDef.stats.description}.`)
            .addField(':heart: support', `${infoDef.support.description}.`)
            .addField(':blue_heart: vote', `${infoDef.vote.description}.`)
            .addField(':white_sun_rain_cloud: weather `[location]`', `${infoDef.weather.description}.`)

        let otherEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('Info Commands')
            .setDescription(`Prefix is **${PREFIX}** as in **${PREFIX}help**.`)
            .addField(':man_running: chucknorrisjoke', `${otherDef.chucknorrisjoke.description}.\nAliases: [${otherDef.chucknorrisjoke.aliases}]`)
            .addField(':speech_left: comment `{your comment}`', `${otherDef.comment.description}.`)
            .addField(':man_curly_haired_tone3: dadjoke', `${otherDef.dadjoke.description}.\nAliases: [${otherDef.dadjoke.aliases}]`)
            .addField(':computer: hack `{@member}`', `${otherDef.hack.description}.`)
            .addField(':rofl: joke', `${otherDef.joke.description}.`)
            .addField(':rofl: meme', `${otherDef.meme.description}.\nAliases: [${otherDef.meme.aliases}]`)
            .addField(':bookmark: quote', `${otherDef.quote.description}.`)
            .addField(':game_die: roll', `${otherDef.roll.description}.\nAliases: [${otherDef.roll.aliases}]`)
            .addField(':information_source: suggest `{suggestion}`', `${otherDef.suggest.description}.`)
            .addField(':information_source: wikipedia `{wiki}`', `${otherDef.wikipedia.description}.\nAliases: [${otherDef.wikipedia.aliases}]`)

        function gotoPage(msg, page) {
            switch (page) {
                case 1:
                    helpEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(helpEmbed);
                    break;
                case 2:
                    setupEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(setupEmbed);
                    break;
                case 3:
                    modEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(modEmbed);
                    break;
                case 4:
                    animalEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(animalEmbed);
                    break;
                case 5:
                    clashEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(clashEmbed);
                    break;
                case 6:
                    cuteEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(cuteEmbed);
                    break;
                case 7:
                    mathEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(mathEmbed);
                    break;
                case 8:
                    infoEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(infoEmbed);
                    break;
                case 9:
                    otherEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
                    msg.edit(otherEmbed);
                    break;
            }
            changePage(msg);
        }

        function changePage(msg) {
            msg.react('⏮')
                .then(msg.react('◀'))
                .then(msg.react('💠'))
                .then(msg.react('▶'))
                .then(msg.react('⏭'))
                .then(msg.react('❌'))


            const filter = (reaction, user) => {
                return ['⏮', '◀', '💠', '▶', '⏭', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            msg.awaitReactions(filter, { max: 1, time: 300000 })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '⏮':
                            page = 1;
                            gotoPage(msg, 1);
                            break;
                        case '◀':
                            if (page <= 1) {
                                page = 1;
                            }
                            else {
                                page--;
                            }
                            gotoPage(msg, page);
                            break;
                        case '💠':
                            if (page == Math.round(maxPages / 2)) {
                                page = Math.round(maxPages / 2);
                            }
                            else {
                                page = Math.round(maxPages / 2);
                            }
                            gotoPage(msg, page);
                            break;
                        case '▶':
                            if (page >= maxPages) {
                                page = maxPages;
                            }
                            else {
                                page++;
                            }
                            gotoPage(msg, page);
                            break;
                        case '⏭':
                            page = maxPages;
                            gotoPage(msg, maxPages);
                            break;
                        case '❌':
                            return msg.edit(helpClosed)
                                .then(close => {
                                    close.delete({ timeout: 5000 });
                                });
                    }
                });
        }
        switch (args[0]) {
            case "setup":
                return message.channel.send(setupEmbed);
            case "mod":
                return message.channel.send(modEmbed);
            case "animal":
                return message.channel.send(animalEmbed);
            case "clash":
                return message.channel.send(clashEmbed);
            case "cute":
                return message.channel.send(cuteEmbed);
            case "math":
                return message.channel.send(mathEmbed);
            case "info":
                return message.channel.send(infoEmbed);
            case "other":
                return message.channel.send(otherEmbed);
        }

        if (!message.guild.me.hasPermission(["READ_MESSAGE_HISTORY", "ADD_REACTIONS"])) {
            message.channel.send(`:grey_question: If you wish to use reactions to navigate the help menu, please make make the following permissions are enabled:\n**Read Messages\nAdd Reactions**\nUsage: ${PREFIX}help \`[topic]\``);
            return message.channel.send(helpFallbackEmbed);
        }
        helpEmbed.setFooter(`Page ${page} of ${maxPages}`, `${message.author.displayAvatarURL()}`);
        message.channel.send(helpEmbed).then(msg => {
            changePage(msg);
        });
    }
}