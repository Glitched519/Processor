const { api } = require('some-random-api');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Pokemon extends BaseCommand {
    constructor() {
        super('pokemon', 'info', ['poke']);
    }

    run(client, message, args) {
        api.pokemon.pokedex(args.join(' ')).then(res => {
            let pokemonEmbed = {
                title: `${res.name} (${res.id})`,
                description: res.description,
                color: `RANDOM`,
                thumbnail: {
                    url: res.sprites.animated
                },
                fields: [
                    {
                        name: `HP`,
                        value: res.stats.hp,
                        inline: true
                    },
                    {
                        name: `Attack`,
                        value: res.stats.attack,
                        inline: true
                    },
                    {
                        name: `Defense`,
                        value: res.stats.defense,
                        inline: true
                    },
                    {
                        name: `Special Attack`,
                        value: res.stats.sp_atk,
                        inline: true
                    },
                    {
                        name: `Special Defense`,
                        value: res.stats.sp_def,
                        inline: true
                    },
                    {
                        name: `Speed`,
                        value: res.stats.sp_def,
                        inline: true
                    },
                    {
                        name: `Height`,
                        value: res.height,
                        inline: true
                    },
                    {
                        name: `Weight`,
                        value: res.weight,
                        inline: true
                    },
                    {
                        name: `Type`,
                        value: res.type,
                        inline: true
                    },
                ]
            }
            message.channel.send({ embed: pokemonEmbed });
        }).catch(err => {
            return message.reply(":x: **That isn't a valid pokemon.**")
        });
    }
}