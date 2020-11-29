const { api } = require('some-random-api');

module.exports = {
    run: async (client, message, args) => {
        api.pokemon.pokedex(args).then(res => {
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
                        value: res.stats[0],
                        inline: true
                    },
                    {
                        name: `Attack`,
                        value: res.stats[1],
                        inline: true
                    },
                    {
                        name: `Defense`,
                        value: res.stats[2],
                        inline: true
                    },
                    {
                        name: `Special Attack`,
                        value: res.stats[3],
                        inline: true
                    },
                    {
                        name: `Special Defense`,
                        value: res.stats[4],
                        inline: true
                    },
                    {
                        name: `Speed`,
                        value: res.stats[5],
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
            message.channel.send({embed: pokemonEmbed});
        }).catch(err => {
            return message.reply(":x: **That isn't a valid pokemon.**")
        })
    },
    aliases: ['poke'],
    description: 'Looks up the stats of a pokemon'
}