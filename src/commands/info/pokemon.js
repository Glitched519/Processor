const { api } = require('some-random-api');
const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class Pokemon extends BaseCommand {
    constructor() {
        super('pokemon', 'info', ['poke']);
    }

    run(client, message, args) {
        api.pokemon.pokedex(args.join(' ')).then(res => {
            let pokemonEmbed = new MessageEmbed()
                .setTitle(`${res.name} (${res.id})`)
                .setDescription(res.description)
                .setColor(`RANDOM`)
                .setThumbnail(res.sprites.animated)
                .addField('HP', res.stats.hp, true)
                .addField('Attack', res.stats.attack, true)
                .addField('Defense', res.stats.defense, true)
                .addField('Special Attack', res.stats.sp_atk, true)
                .addField('Special Defense', res.stats.sp_def, true)
                .addField('Speed', res.stats.speed, true)

            message.channel.send(pokemonEmbed);
        }).catch(err => {
            return message.reply(":x: **That isn't a valid pokemon.**")
        });
    }
}