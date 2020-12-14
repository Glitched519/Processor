const config = require('../../../config.json');
const PREFIX = config["bot-prefix"];
const userban = require('../../mod/userban');
const userkick = require('../../mod/userkick');
const idban = require('../../mod/idban');
const idkick = require('../../mod/idkick');
const purge = require('../../mod/purge');
const slowmode = require('../../mod/slowmode');
const warn = require('../../mod/warn');
const binary = require('../math/binary');
const base32 = require('../math/base32');
const base64 = require('../math/base64');
const calculate = require('../math/calculate');
const hexadecimal = require('../math/hexadecimal')
const fact = require('../animal/animalfact');
const image = require('../animal/animalimage');
const baselayout = require('../clash/baselayout');
const clashtips = require('../clash/clashtips');
const searchclan = require('../clash/searchclan');
const searchplayer = require('../clash/searchplayer');
const hug = require('../cute/hug');
const pat = require('../cute/pat');
const wink = require('../cute/wink');
const author = require('./author');
const avatar = require('./avatar');
const definition = require('./definition');
const giphygif = require('./giphygif');
const github = require('./github');
const googleimage = require('./googleimage');
const invite = require('./invite');
const lyrics = require('./lyrics');
const ping = require('./ping');
const pokemon = require('./pokemon');
const poll = require('../info/poll');
const stats = require('./stats');
const chucknorrisjoke = require('../other/chucknorrisjoke');
const dadjoke = require('../other/dadjoke');
const echo = require('../other/echo');
const hack = require('../other/hack');
const joke = require('../../fun/other/joke');
const meme = require('../other/meme');
const quote = require('../other/quote');
const roll = require('../other/roll');
const suggest = require('../other/suggest');
const wikipedia = require('../other/wikipedia');
const donate = require('../../extra/donate');
const faq = require('../../extra/faq');
const menus = require('../../extra/menus');
const rule = require('../../extra/rule');
const tos = require('../../extra/tos');
const usage = require('../../extra/usage');
const permissions = require('../../mod/permissions');

module.exports = {
    run: async (client, message, args) => {
        let closedEmbed = {
            title: 'Help Closed',
            description: 'Deleting this message in a few seconds...'
        }
        let helpFallbackEmbed = {
            color: `RANDOM`,
            title: 'Need some help?',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.\n<required> [optional]`,
            fields: [
                {
                    name: ':shield: Moderation  `mod`',
                    value: "Manages server members.",
                },
                {
                    name: ':cat: Animal  `animal`',
                    value: "Learn about animals.",
                },
                {
                    name: ':crossed_swords: Clash  `clash`',
                    value: "Look up Clash of Clans related things.",
                },
                {
                    name: ':blue_heart: Cute  `cute`',
                    value: "Adore a member.",
                },
                {
                    name: ':1234: Math  `math`',
                    value: "Play with numbers.",
                },
                {
                    name: ':information_source: Info  `info`',
                    value: "Get information about a user or the server.",
                },
                {
                    name: ':musical_note: Music  `music`',
                    value: "Play music.",
                },
                // {
                //     name: ':newspaper: SYSLX `syslx`',
                //     value: "[GTA V Mod Menu.](https://discord.gg/zrMMayP)",
                // }, 
                {
                    name: ':o: Other  `other`',
                    value: "Play with other commands.",
                },
            ]
        }
        let helpEmbed = {
            color: `RANDOM`,
            title: 'Need some help?',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.\n<required> [optional]\n${PREFIX}help [topic]`,
            fields: [
                {
                    name: ':shield: Moderation',
                    value: "Manages server members.",
                },
                {
                    name: ':cat: Animal',
                    value: "Learn about animals.",
                },
                {
                    name: ':crossed_swords: Clash',
                    value: "Look up Clash of Clans related things.",
                },
                {
                    name: ':blue_heart: Cute',
                    value: "Adore a member.",
                },
                {
                    name: ':1234: Math',
                    value: "Play with numbers.",
                },
                {
                    name: ':information_source: Info',
                    value: "Get information about a user or the server.",
                },
                // {
                //     name: ':musical_note: Music',
                //     value: "Play music.",
                // },
                // {
                //     name: ':newspaper: SYSLX `syslx`',
                //     value: "[GTA V Mod Menu.](https://discord.gg/zrMMayP)",
                // }, 
                {
                    name: ':o: Other',
                    value: "Play with other commands.",
                },
            ]
        }
        let modEmbed = {
            color: `RANDOM`,
            title: 'Moderation Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':shield: permissions',
                    value: `${permissions.description}.\nAliases: [${permissions.aliases}]`,
                },
                {
                    name: ':hammer_pick: __user__ban `<@member> [reason]`',
                    value: `${userban.description}.\nAliases: [${userban.aliases}]`,
                },
                {
                    name: ':boot: __user__kick `<@member> [reason]`',
                    value: `${userkick.description}.\nAliases: [${userkick.aliases}]`,
                },
                {
                    name: ':broom: purge `<number>`',
                    value: `${purge.description}.`,
                },
                {
                    name: ':clock10: slowmode `[number]`',
                    value: `${slowmode.description}.`,
                },
                {
                    name: ':hammer_pick: __id__ban `<@id> [reason]`',
                    value: `${idban.description}.\nAliases: [${idban.aliases}]`,
                },
                {
                    name: ':boot: __id__kick `<@id> [reason]`',
                    value: `${idkick.description}.\nAliases: [${idkick.aliases}]`,
                },
                {
                    name: ':warning: warn `<@member> [reason]`',
                    value: `${warn.description}.`,
                },
            ],
        };

        let mathEmbed = {
            color: `RANDOM`,
            title: 'Math Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':1234: base32 `<number>`',
                    value: `${base32.description}.\nAliases: [${base32.aliases}]`,
                },
                {
                    name: ':1234: base64 `<number>`',
                    value: `${base64.description}.\nAliases: [${base64.aliases}]`,
                },
                {
                    name: ':1234: binary `<number>`',
                    value: `${binary.description}.\nAliases: [${binary.aliases}]`,
                },
                {
                    name: ':computer: calculate `<expression>`',
                    value: `${calculate.description}.\nAliases: [${calculate.aliases}]`,
                },
                {
                    name: ':capital_abcd: hexadecimal `<number>`',
                    value: `${hexadecimal.description}.\nAliases: [${hexadecimal.aliases}]`,
                },
            ]
        }

        let animalEmbed = {
            color: `RANDOM`,
            title: 'Animal Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':information_source: animalfact `<animal>`',
                    value: `${fact.description}.\nAliases: [${fact.aliases}]`,
                },
                {
                    name: ':frame_photo: animalimage `<animal>`',
                    value: `${image.description}.\nAliases: [${image.aliases}]`,
                },
            ]
        }

        let clashEmbed = {
            color: `RANDOM`,
            title: 'Clash of Clans Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':green_square: baselayout `<th/bh level>`',
                    value: `${baselayout.description}.\nAliases: [${baselayout.aliases}]`,
                },
                {
                    name: ':information_source: clashtips `[index]`',
                    value: `${clashtips.description}.\nAliases: [${clashtips.aliases}]`,
                },
                {
                    name: ':mag: searchclan `<#tag>`',
                    value: `${searchclan.description}.\nAliases: [${searchclan.aliases}]`,
                },
                {
                    name: ':mag: searchplayer `<#tag>`',
                    value: `${searchplayer.description}.\nAliases: [${searchplayer.aliases}]`,
                },
            ]
        }

        let cuteEmbed = {
            color: `RANDOM`,
            title: 'Cute Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':hugging: hug `<@member>`',
                    value: `${hug.description}.`,
                },
                {
                    name: ':open_hands: pat `<@member>`',
                    value: `${pat.description}.`,
                },
                {
                    name: ':wink: wink `<@member>`',
                    value: `${wink.description}.`,
                },
            ]
        }

        let infoEmbed = {
            color: `RANDOM`,
            title: 'Info Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':man_construction_worker: author',
                    value: `${author.description}.\nAliases: [${author.aliases}]`,
                },
                {
                    name: ':frame_photo: avatar `[@member]`',
                    value: `${avatar.description}.\nAliases: [${avatar.aliases}]`,
                },
                {
                    name: ':book: definition `<word>`',
                    value: `${definition.description}.\nAliases: [${definition.aliases}]`,
                },
                {
                    name: ':frame_photo: giphygif `<search>`',
                    value: `${giphygif.description}.\nAliases: [${giphygif.aliases}]`,
                },
                {
                    name: ':link: github',
                    value: `${github.description}.\nAliases: [${github.aliases}]`,
                },
                {
                    name: ':mag: googleimage `<search>`',
                    value: `${googleimage.description}.\nAliases: [${googleimage.aliases}]`,
                },
                {
                    name: ':link: invite',
                    value: `${invite.description}.\nAliases: [${invite.aliases}]`,
                },
                {
                    name: ':exclamation: ping',
                    value: `${ping.description}.\nAliases: [${ping.aliases}]`,
                },
                {
                    name: ':dog2: pokemon `<pokemon>`',
                    value: `${pokemon.description}.\nAliases: [${pokemon.aliases}]`,
                },
                {
                    name: ':information_source: poll `<question>`',
                    value: `${poll.description}.`,
                },
                {
                    name: ':information_source: stats `[@member]`',
                    value: `${stats.description}.`,
                },
            ]
        }

        let musicEmbed = {
            color: `RANDOM`,
            title: 'Music Commands [SUSPENDED]',
            description: `Commands won't work until issue is fixed.`,
            fields: [
                {
                    name: ':arrow_forward: play `<song>`',
                    value: `Plays a song via search term or URL from YouTube.\nAliases: [p]`,
                },
                {
                    name: ':stop_button: stop',
                    value: `Stops the current song playing. Clears the queue.`,
                },
                {
                    name: ':track_next: skip',
                    value: `Skips to the next song.`,
                },
                {
                    name: ':loud_sound: volume',
                    value: `Change the volume.\n Aliases: [vol]`,
                },
                {
                    name: ':card_box: queue',
                    value: `Shows the song queue, and the song now playing.\nAliases: [q]`
                },
                {
                    name: ':pause_button: pause',
                    value: `Pauses the current song.`
                },
                {
                    name: ':arrow_forward: resume',
                    value: `Resumes the current song if paused.`
                },
                {
                    name: ':repeat_one: loop',
                    value: `Loops the current song.`
                },
                {
                    name: ':musical_note: lyrics `<song>`',
                    value: `${lyrics.description}.\nAliases: [${lyrics.aliases}]`,
                },
            ]
        }

        let SYSLXEmbed = {
            color: `RANDOM`,
            title: 'SYSLX Menu Commands',
            url: "https://invite.gg/syslx",
            color: `RANDOM`,
            thumbnail: {
                url: "https://syslx-menu.com/styles/syslxlogo.png"
            },
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':moneybag: donate',
                    value: `${donate.description}.\nAliases: [${donate.aliases}]`,
                },
                {
                    name: ':grey_question: faq',
                    value: `${faq.description}.`,
                },
                {
                    name: ':newspaper: menus',
                    value: `${menus.description}.\nAliases: [${menus.aliases}]`,
                },
                {
                    name: ':shield: rule',
                    value: `${rule.description}.`,
                },
                {
                    name: ':shield: tos',
                    value: `${tos.description}.`,
                },
                {
                    name: ':newspaper: usage',
                    value: `${usage.description}.\nAliases: [${usage.aliases}]`,
                }
            ]
        }

        let otherEmbed = {
            color: `RANDOM`,
            title: 'Other Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            fields: [
                {
                    name: ':man_running: chucknorrisjoke',
                    value: `${chucknorrisjoke.description}.\nAliases: [${chucknorrisjoke.aliases}]`,
                },
                {
                    name: ':man_curly_haired_tone3: dadjoke',
                    value: `${dadjoke.description}.\nAliases: [${dadjoke.aliases}]`,
                },
                {
                    name: ':sound: echo `<message>`',
                    value: `${echo.description}.\nAliases: [${echo.aliases}]`,
                },
                {
                    name: ':computer: hack `<@member>`',
                    value: `${hack.description}.`,
                },
                {
                    name: ':rofl: joke',
                    value: `${joke.description}.`,
                },
                {
                    name: ':rofl: meme',
                    value: `${meme.description}.\nAliases: [${meme.aliases}]`,
                },
                {
                    name: ':bookmark: quote',
                    value: `${quote.description}.`,
                },
                {
                    name: ':game_die: roll',
                    value: `${roll.description}.\nAliases: [${roll.aliases}]`,
                },
                {
                    name: ':information_source: suggest `<suggestion>`',
                    value: `${suggest.description}.`,
                },
                {
                    name: ':information_source: wikipedia `<wiki>`',
                    value: `${wikipedia.description}.\nAliases: [${wikipedia.aliases}]`,
                },
            ]
        }

        function help(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: helpEmbed });
            msg.react('❌')
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                ////.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'))

            const filter = (reaction, user) => {
                return ['❌', '🛡', '🐱', '⚔', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function mod(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: modEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🐱', '⚔', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function animal(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: animalEmbed });
            msg.react('🔼')
                .then(() => msg.react('🛡'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'))
                .then(() => msg.react('❌'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '⚔', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function clash(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: clashEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function cute(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: cuteEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '⚔', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function math(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: mathEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function info(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: infoEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                //.then(() => msg.react('🎵')
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', '🔢', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function music(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: musicEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                .then(() => msg.react('⭕'));

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', '🔢', 'ℹ', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '⭕':
                            other(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }

        function other(msg) {
            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            msg.edit({ embed: otherEmbed });
            msg.react('🔼')
                .then(() => msg.react('❌'))
                .then(() => msg.react('🛡'))
                .then(() => msg.react('🐱'))
                .then(() => msg.react('⚔'))
                .then(() => msg.react('💙'))
                .then(() => msg.react('🔢'))
                .then(() => msg.react('ℹ'))
                //.then(() => msg.react('🎵');

            const filter = (reaction, user) => {
                return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', '🔢', 'ℹ', '🎵'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🔼':
                            help(msg);
                            break;
                        case '❌':
                            return msg.edit({embed: closedEmbed})
                            .then(msg => {
                                msg.delete({ timeout: 7000 });
                            });
                        case '🛡':
                            mod(msg);
                            break;
                        case '🐱':
                            animal(msg);
                            break;
                        case '⚔':
                            clash(msg);
                            break;
                        case '💙':
                            cute(msg);
                            break;
                        case '🔢':
                            math(msg);
                            break;
                        case 'ℹ':
                            info(msg);
                            break;
                        case '🎵':
                            music(msg);
                            break;
                    }
                })
                .catch(collected => {
                    msg.delete();
                });
        }
        if (args == "mod") {
            return message.channel.send({ embed: modEmbed });
        }
        if (args == "animal") {
            return message.channel.send({ embed: animalEmbed });
        }
        if (args == "clash") {
            return message.channel.send({ embed: clashEmbed });
        }
        if (args == "cute") {
            return message.channel.send({ embed: cuteEmbed });
        }
        if (args == "math") {
            return message.channel.send({ embed: mathEmbed });
        }
        if (args == "info") {
            return message.channel.send({ embed: infoEmbed });
        }
        // if (args == "music") {
        //     return message.channel.send({ embed: musicEmbed });
        // }
        if (args == "other") {
            return message.channel.send({ embed: otherEmbed });
        }
        if (args == "syslx") {
            return message.channel.send({ embed: SYSLXEmbed });
        }

        if (!message.guild.me.hasPermission(["READ_MESSAGE_HISTORY", "ADD_REACTIONS", "MANAGE_MESSAGES"])) {
            message.channel.send(`:grey_question: If you wish to use reactions to navigate the help menu, please make make the following permissions are enabled:\n**Read Messages\nAdd Reactions\nRead Message History**\nUsage: ${PREFIX}help \`[topic]\``);
            return message.channel.send({embed: helpFallbackEmbed});
        }
        message.channel.send({ embed: helpEmbed }).then((msg) => {
            help(msg);
        });
    },
    aliases: [],
    description: 'Shows the help menu'
}


