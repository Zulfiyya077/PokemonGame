export const pokemonData = [
    {
        id: 1,
        name: "Bulbasaur",
        type: "grass"
    },
    {
        id: 4,
        name: "Charmander",
        type: "fire"
    },
    {
        id: 7,
        name: "Squirtle",
        type: "water"
    },
    {
        id: 25,
        name: "Pikachu",
        type: "electric"
    },
    {
        id: 39,
        name: "Jigglypuff",
        type: "fairy"
    },
    {
        id: 52,
        name: "Meowth",
        type: "normal"
    },
    {
        id: 65,
        name: "Alakazam",
        type: "psychic"
    },
    {
        id: 94,
        name: "Gengar",
        type: "ghost"
    },
    {
        id: 133,
        name: "Eevee",
        type: "normal"
    },
    {
        id: 150,
        name: "Mewtwo",
        type: "psychic"
    }
];

export const getPokemonImageUrl = (id) => {
    const paddedId = String(id).padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
};

export default getPokemonImageUrl;