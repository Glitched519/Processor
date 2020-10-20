const fetch = require('node-fetch');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
async function getPokemon(pokemon) {
    try {
        let response = await fetch(`${BASE_URL}/${pokemon.toLowerCase()}`);
        return await response.json();
    }
    catch (err) {

    }
}

module.exports = { getPokemon };