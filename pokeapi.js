const axios = require('axios');

let pokemons = [
    'bulbasaur',
    'ivysaur',
    'venusaur',
    'charmander',
    'charmeleon',
    'charizard',
    'squirtle',
    'wartortle',
    'blastoise',
    'pikachu',
    'jigglypuff',
    'eevee',
    'snorlax',
    'mewtwo'
];

let availability = [
    ['bulbasaur', ['2024-10-01', '2024-10-02']],
    ['ivysaur', ['2024-10-02', '2024-10-03']],
    ['venusaur', ['2024-10-03', '2024-10-04']],
    ['charmander', ['2024-10-01', '2024-10-03']],
    ['charmeleon', ['2024-10-02', '2024-10-04']],
    ['charizard', ['2024-10-01', '2024-10-03']],
    ['squirtle', ['2024-10-02', '2024-10-03']],
    ['wartortle', ['2024-10-03', '2024-10-04']],
    ['blastoise', ['2024-10-01', '2024-10-02']],
    ['pikachu', ['2024-10-01', '2024-10-04']],
    ['jigglypuff', ['2024-10-02', '2024-10-03']],
    ['eevee', ['2024-10-03', '2024-10-04']],
    ['snorlax', ['2024-10-01', '2024-10-02']],
    ['mewtwo', ['2024-10-03', '2024-10-04']]
];

let types = [
    'grass',  // Bulbasaur
    'grass',  // Ivysaur
    'grass',  // Venusaur
    'fire',   // Charmander
    'fire',   // Charmeleon
    'fire',   // Charizard
    'water',  // Squirtle
    'water',  // Wartortle
    'water',  // Blastoise
    'electric', // Pikachu
    'normal',  // Jigglypuff
    'normal',  // Eevee
    'normal',  // Snorlax
    'psychic'  // Mewtwo
];


//this url becomes https://pokeapi.co/api/v2/pokemon/bulbasaur
let URL = `https://pokeapi.co/api/v2/pokemon/${pokemons[0]}`

//names url not really needed but i'd like for this to stay here
let URLnames = `https://pokeapi.co/api/v2/type/${types[0]}`

axios.get(URL).then(res => {
    let pokemon = res.data;
    // console.log(pokemon)
    //this gets the axios call to https://pokeapi.co/api/v2/pokemon/bulbasaur
});

types.map(elem => {
    axios.get(`https://pokeapi.co/api/v2/type/${elem}`).then(res => {
        let type = res.data
        // console.log(type.name)
    })
})


pokemons.map((element, index) => { //the element part goes for the elements in the array, the index goes for the index in the types array above
    /*for this, for every pokemon in the pokemons array above,
    //the link is made for it.
    eg: https://pokeapi.co/api/v2/pokemon/bulbasaur
    https://pokeapi.co/api/v2/pokemon/charmander
    https://pokeapi.co/api/v2/pokemon/squirtle
    */
    let URL = `https://pokeapi.co/api/v2/pokemon/${element}`
    // console.log(element);
    axios.get(URL).then(res => {
        const pokemon = res.data;

        //get the corresponding type along with the pokemon
        const correspondingType= types[index]

        console.log(`${pokemon.name} type: ${correspondingType}`)
    }); 
    
})