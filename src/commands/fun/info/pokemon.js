const Discord = require('discord.js');
const { getPokemon } = require('../../../utils/getpokemon');

module.exports = {
    run: async(client, message, args) => {
        const pokemon = args;
        const pokeData = await getPokemon(pokemon);
        const { sprites, stats, weight, name, id, base_experience, abilities, types } = pokeData;
        const pokeEmbed = new Discord.MessageEmbed()
        .setThumbnail(`${sprites.front_default}`)
        .setTitle(`${name} #${id}`);
        stats.forEach(stat => pokeEmbed.addField(stat.stat.name, stat.base_stat, true));
        types.forEach(type => pokeEmbed.addField('Type', type.type.name, true));
        pokeEmbed.addField('Weight', weight);
        pokeEmbed.addField('Base Experience', base_experience); 
        message.channel.send(pokeEmbed);

    }, 
    aliases: ['poke'],
    description: 'Shows the creator of this awesome bot'
}