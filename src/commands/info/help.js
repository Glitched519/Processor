const config = require('../../config.json');
const PREFIX = config.prefix;
const BaseCommand = require('../../utils/structures/BaseCommand');
const { modDef, mathDef, animalDef, clashDef, cuteDef, infoDef, otherDef } = require('../../defs');


module.exports = class Help extends BaseCommand {
  constructor() {
    super('help', 'info', []);
  }

  run(client, message, args) {
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
          value: `${modDef.permissions.description}.\nAliases: [${modDef.permissions.aliases}]`,
        },
        {
          name: ':hammer_pick: __user__ban `<@member> [reason]`',
          value: `${modDef.userban.description}.\nAliases: [${modDef.userban.aliases}]`,
        },
        {
          name: ':boot: __user__kick `<@member> [reason]`',
          value: `${modDef.userkick.description}.\nAliases: [${modDef.userkick.aliases}]`,
        },
        {
          name: ':broom: purge `<number>`',
          value: `${modDef.purge.description}.\nAliases: [${modDef.purge.aliases}]`,
        },
        {
          name: ':clock10: slowmode `[number]`',
          value: `${modDef.slowmode.description}.\nAliases: [${modDef.slowmode.aliases}]`,
        },
        {
          name: ':hammer_pick: __id__ban `<@id> [reason]`',
          value: `${modDef.idban.description}.\nAliases: [${modDef.idban.aliases}]`,
        },
        {
          name: ':boot: __id__kick `<@id> [reason]`',
          value: `${modDef.idkick.description}.\nAliases: [${modDef.idkick.aliases}]`,
        },
        {
          name: ':warning: warn `<@member> [reason]`',
          value: `${modDef.warn.description}.\nAliases: [${modDef.warn.aliases}]`,
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
          value: `${mathDef.base32.description}.\nAliases: [${mathDef.base32.aliases}]`,
        },
        {
          name: ':1234: base64 `<number>`',
          value: `${mathDef.base64.description}.\nAliases: [${mathDef.base64.aliases}]`,
        },
        {
          name: ':1234: binary `<number>`',
          value: `${mathDef.binary.description}.\nAliases: [${mathDef.binary.aliases}]`,
        },
        {
          name: ':computer: calculate `<expression>`',
          value: `${mathDef.calculate.description}.\nAliases: [${mathDef.calculate.aliases}]`,
        },
        {
          name: ':capital_abcd: hexadecimal `<number>`',
          value: `${mathDef.hexadecimal.description}.\nAliases: [${mathDef.hexadecimal.aliases}]`,
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
          value: `${animalDef.animalfact.description}.\nAliases: [${animalDef.animalfact.aliases}]`,
        },
        {
          name: ':frame_photo: animalimage `<animal>`',
          value: `${animalDef.animalimage.description}.\nAliases: [${animalDef.animalimage.aliases}]`,
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
          value: `${clashDef.baselayout.description}.\nAliases: [${clashDef.baselayout.aliases}]`,
        },
        {
          name: ':information_source: clashtips `[index]`',
          value: `${clashDef.clashtips.description}.\nAliases: [${clashDef.clashtips.aliases}]`,
        },
        {
          name: ':mag: searchclan `<#tag>`',
          value: `${clashDef.searchclan.description}.\nAliases: [${clashDef.searchclan.aliases}]`,
        },
        {
          name: ':mag: searchplayer `<#tag>`',
          value: `${clashDef.searchplayer.description}.\nAliases: [${clashDef.searchplayer.aliases}]`,
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
          value: `${cuteDef.hug.description}.`,
        },
        {
          name: ':open_hands: pat `<@member>`',
          value: `${cuteDef.pat.description}.`,
        },
        {
          name: ':wink: wink `<@member>`',
          value: `${cuteDef.wink.description}.`,
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
          value: `${infoDef.author.description}.\nAliases: [${infoDef.author.aliases}]`,
        },
        {
          name: ':frame_photo: avatar `[@member]`',
          value: `${infoDef.avatar.description}.\nAliases: [${infoDef.avatar.aliases}]`,
        },
        {
          name: ':book: definition `<word>`',
          value: `${infoDef.definition.description}.\nAliases: [${infoDef.definition.aliases}]`,
        },
        {
          name: ':frame_photo: giphygif `<search>`',
          value: `${infoDef.giphygif.description}.\nAliases: [${infoDef.giphygif.aliases}]`,
        },
        {
          name: ':link: github',
          value: `${infoDef.github.description}.\nAliases: [${infoDef.github.aliases}]`,
        },
        {
          name: ':mag: googleimage `<search>`',
          value: `${infoDef.googleimage.description}.\nAliases: [${infoDef.googleimage.aliases}]`,
        },
        {
          name: ':link: invite',
          value: `${infoDef.invite.description}.\nAliases: [${infoDef.invite.aliases}]`,
        },
        {
          name: ':musical_note: lyrics `<song>`',
          value: `${infoDef.lyrics.description}.\nAliases: [${infoDef.lyrics.aliases}]`,
        },
        {
          name: ':mobile_phone: phone `<phone name>`',
          value: `${infoDef.phone.description}.`,
        },
        {
          name: ':exclamation: ping',
          value: `${infoDef.ping.description}.\nAliases: [${infoDef.ping.aliases}]`,
        },
        {
          name: ':dog2: pokemon `<pokemon>`',
          value: `${infoDef.pokemon.description}.\nAliases: [${infoDef.pokemon.aliases}]`,
        },
        {
          name: ':information_source: poll `<question>`',
          value: `${infoDef.poll.description}.`,
        },
        {
          name: ':information_source: stats `[@member]`',
          value: `${infoDef.stats.description}.`,
        },
        {
          name: ':information_source: stats `[@member]`',
          value: `${infoDef.stats.description}.`,
        },
        {
          name: ':heart: support',
          value: `${infoDef.support.description}.`,
        },
        {
          name: ':blue_heart: vote',
          value: `${infoDef.vote.description}.`,
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
      ]
    }

    let otherEmbed = {
      color: `RANDOM`,
      title: 'Other Commands',
      description: `Prefix is **${PREFIX}** as in **${PREFIX}help**.`,
      fields: [
        {
          name: ':man_running: chucknorrisjoke',
          value: `${otherDef.chucknorrisjoke.description}.\nAliases: [${otherDef.chucknorrisjoke.aliases}]`,
        },
        {
          name: ':speech_left: comment `<your comment>`',
          value: `${otherDef.comment.description}.`
        },
        {
          name: ':man_curly_haired_tone3: dadjoke',
          value: `${otherDef.dadjoke.description}.\nAliases: [${otherDef.dadjoke.aliases}]`,
        },
        {
          name: ':sound: echo `<message>`',
          value: `${otherDef.echo.description}.\nAliases: [${otherDef.echo.aliases}]`,
        },
        {
          name: ':computer: hack `<@member>`',
          value: `${otherDef.hack.description}.`,
        },
        {
          name: ':rofl: joke',
          value: `${otherDef.joke.description}.`,
        },
        {
          name: ':rofl: meme',
          value: `${otherDef.meme.description}.\nAliases: [${otherDef.meme.aliases}]`,
        },
        {
          name: ':bookmark: quote',
          value: `${otherDef.quote.description}.`,
        },
        {
          name: ':game_die: roll',
          value: `${otherDef.roll.description}.\nAliases: [${otherDef.roll.aliases}]`,
        },
        {
          name: ':information_source: suggest `<suggestion>`',
          value: `${otherDef.suggest.description}.`,
        },
        {
          name: ':information_source: wikipedia `<wiki>`',
          value: `${otherDef.wikipedia.description}.\nAliases: [${otherDef.wikipedia.aliases}]`,
        },
      ]
    }

    async function help(msg) {
      if (msg.embeds[0].title !== "Need some help?") {
        msg.edit({ embed: helpEmbed });
      }
      msg.react('🛡')
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('🔢'))
        .then(() => msg.react('ℹ'))
        .then(() => msg.react('⭕'))
        ////.then(() => msg.react('🎵')
        .then(() => msg.react('❌'))
      const filter = (reaction, user) => {
        return ['❌', '🛡', '🐱', '⚔', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: modEmbed });
      msg.react('🔼')
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('🔢'))
        .then(() => msg.react('ℹ'))
        //.then(() => msg.react('🎵')
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🐱', '⚔', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: clashEmbed });
      msg.react('🔼')
        .then(() => msg.react('🛡'))
        .then(() => msg.react('🐱'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('🔢'))
        .then(() => msg.react('ℹ'))
        //.then(() => msg.react('🎵')
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🛡', '🐱', '💙', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: cuteEmbed });
      msg.react('🔼')
        .then(() => msg.react('🛡'))
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('🔢'))
        .then(() => msg.react('ℹ'))
        //.then(() => msg.react('🎵')
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🛡', '🐱', '⚔', '🔢', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: mathEmbed });
      msg.react('🔼')
        .then(() => msg.react('🛡'))
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('ℹ'))
        //.then(() => msg.react('🎵')
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', 'ℹ', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: infoEmbed });
      msg.react('🔼')
        .then(() => msg.react('🛡'))
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('🔢'))
        //.then(() => msg.react('🎵')
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', '🔢', '🎵', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
      msg.edit({ embed: musicEmbed });
      msg.react('🔼')
        .then(() => msg.react('🛡'))
        .then(() => msg.react('🐱'))
        .then(() => msg.react('⚔'))
        .then(() => msg.react('💙'))
        .then(() => msg.react('🔢'))
        .then(() => msg.react('ℹ'))
        .then(() => msg.react('⭕'))
        .then(() => msg.react('❌'))

      const filter = (reaction, user) => {
        return ['🔼', '❌', '🛡', '🐱', '⚔', '💙', '🔢', 'ℹ', '⭕'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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

      msg.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          switch (reaction.emoji.name) {
            case '🔼':
              help(msg);
              break;
            case '❌':
              return msg.delete();
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
    if (args[0] == "mod") {
      return message.channel.send({ embed: modEmbed });
    }
    if (args[0] == "animal") {
      return message.channel.send({ embed: animalEmbed });
    }
    if (args[0] == "clash") {
      return message.channel.send({ embed: clashEmbed });
    }
    if (args[0] == "cute") {
      return message.channel.send({ embed: cuteEmbed });
    }
    if (args[0] == "math") {
      return message.channel.send({ embed: mathEmbed });
    }
    if (args[0] == "info") {
      return message.channel.send({ embed: infoEmbed });
    }
    // if (args[0] == "music") {
    //     return message.channel.send({ embed: musicEmbed });
    // }
    if (args[0] == "other") {
      return message.channel.send({ embed: otherEmbed });
    }

    if (!message.guild.me.hasPermission(["READ_MESSAGE_HISTORY", "ADD_REACTIONS"])) {
      message.channel.send(`:grey_question: If you wish to use reactions to navigate the help menu, please make make the following permissions are enabled:\n**Read Messages\nAdd Reactions**\nUsage: ${PREFIX}help \`[topic]\``);
      return message.channel.send({ embed: helpFallbackEmbed });
    }
    message.channel.send({ embed: helpEmbed }).then((msg) => {
      help(msg);
    });
  }
}