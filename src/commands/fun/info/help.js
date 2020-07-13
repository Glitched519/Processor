const PREFIX = process.env.PREFIX;
const userban = require('../../mod/userban');
const userkick = require('../../mod/userkick');
const idban = require('../../mod/idban');
const idkick = require('../../mod/idkick');
const mute = require('../../mod/mute');
const unmute = require('../../mod/unmute');
const binary = require('../math/binary');
const base64 = require('../math/base64');
const calculate = require('../math/calculate');
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
const github = require('./github');
const googleimage = require('./googleimage');
const invite = require('./invite');
const lyrics = require('./lyrics');
const ping = require('./ping');
const pokemon = require('./pokemon');
const userinfo = require('./userinfo');
const echo = require('../other/echo');
const meme = require('../other/meme');
const roll = require('../other/roll');
const suggest = require('../other/suggest');
const wikipedia = require('../other/wikipedia');

module.exports = {
    run: async(client, message, args) => {
        let helpEmbed = {
            color: `RANDOM`,
            title: 'Need some help?',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.\n<required> [optional]\n${PREFIX}help [topic]`,
            timestamp: new Date(),
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
                    name: ':o: Other  `other`',
                    value: "Play with other commands.",
                },
            ]
        }
        let modEmbed = {
            color: `RANDOM`,
            title: 'Moderation Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
            fields: [
                {
                    name: ':hammer_pick: __user__ban `<@member> [reason]`',
                    value: `${userban.description}.\nAliases: [${userban.aliases}]`,
                },
                {
                    name: ':boot: __user__kick `<@member> [reason]`',
                    value: `${userkick.description}.\nAliases: [${userkick.aliases}]`,
                },
                {
                    name: ':mute: mute `<@member> [reason]`',
                    value: `${mute.description}.`,
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
                    name: ':speaker: unmute `<@member> [reason]`',
                    value: `${unmute.description}.`,
                },
            ],
        };

        let mathEmbed = {
            color: `RANDOM`,
            title: 'Math Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
            fields: [
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
            ]
        }

        let animalEmbed = {
            color: `RANDOM`,
            title: 'Animal Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
            fields: [
                {
                    name: ':information_source: fact `<animal>`',
                    value: `${fact.description}.\nAliases: [${fact.aliases}]`,
                },
                {
                    name: ':frame_photo: image `<animal>`',
                    value: `${image.description}.\nAliases: [${image.aliases}]`,
                },
            ]
        }

        let clashEmbed = {
            color: `RANDOM`,
            title: 'Clash of Clans Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
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
                    name: ':mag: searchclan `<tag>`',
                    value: `${searchclan.description}.\nAliases: [${searchclan.aliases}]`,
                },
                {
                    name: ':mag: searchplayer `<tag>`',
                    value: `${searchplayer.description}.\nAliases: [${searchplayer.aliases}]`,
                },
            ]
        }

        let cuteEmbed = {
            color: `RANDOM`,
            title: 'Cute Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
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
            timestamp: new Date(),
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
                    name: ':link: github',
                    value: `${github.description}.\nAliases: [${github.aliases}]`,
                },
                {
                    name: ':mag: googleimage',
                    value: `${googleimage.description}.\nAliases: [${googleimage.aliases}]`,
                },
                {
                    name: ':link: invite',
                    value: `${invite.description}.\nAliases: [${invite.aliases}]`,
                },
                {
                    name: ':musical_note: lyrics `<song>`',
                    value: `${lyrics.description}.\nAliases: [${lyrics.aliases}]`,
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
                    name: ':information_source: userinfo `[@member]`',
                    value: `${userinfo.description}.\nAliases: [${userinfo.aliases}]`,
                },
            ]
        }

        let otherEmbed = {
            color: `RANDOM`,
            title: 'Other Commands',
            description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
            timestamp: new Date(),
            fields: [
                {
                    name: ':sound: echo `<message>`',
                    value: `${echo.description}.\nAliases: [${echo.aliases}]`,
                },
                {
                    name: ':rofl: meme',
                    value: `${meme.description}.\nAliases: [${meme.aliases}]`,
                },
                {
                    name: ':game_die: roll',
                    value: `${roll.description}.\nAliases: [${roll.aliases}]`,
                }, 
                {
                    name: ':information_source: suggest `<suggestion>`',
                    value: `${suggest.description}.\nAliases: [${suggest.aliases}]`,
                },
                {
                    name: ':information_source: wikipedia `<wiki>`',
                    value: `${wikipedia.description}.\nAliases: [${wikipedia.aliases}]`,
                },
            ]
        }

        if (args == `${PREFIX}help`) {
            message.channel.send({embed: helpEmbed});    
        }
        else if (args.startsWith('mod')) {
            message.channel.send({embed: modEmbed});    
        }
        else if (args.startsWith('math')) {
            message.channel.send({embed: mathEmbed});    
        }
        else if (args.startsWith('animal')) {
            message.channel.send({embed: animalEmbed});    
        }
        else if (args.startsWith('clash')) {
            message.channel.send({embed: clashEmbed});    
        }
        else if (args.startsWith('cute')) {
            message.channel.send({embed: cuteEmbed});    
        }
        else if (args.startsWith('info')) {
            message.channel.send({embed: infoEmbed});    
        }
        else if (args.startsWith('other')) {
            message.channel.send({embed: otherEmbed});    
        }
    }, 
    aliases: [],
    description: 'Shows the help menu'
}


