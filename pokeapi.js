const axios = require('axios');

let pokemons = [
    'bulbasaur',
    'charmander',
    'squirtle'
]

let types = [
    'grass',
    'fire',
    'water'
]

let names = [
    'grass',
    'water',
    'fire'
]

//this url becomes https://pokeapi.co/api/v2/pokemon/bulbasaur
let URL = `https://pokeapi.co/api/v2/pokemon/${pokemons[0]}`

//names url
let URLnames = `https://pokeapi.co/api/v2/type/${names[0]}`

axios.get(URL).then(res => {
    let pokemon = res.data;
    // console.log(pokemon.types)
    
    // console.log(pokemon, 'im hererere')
    //this gets the axios call to https://pokeapi.co/api/v2/pokemon/bulbasaur
});

names.map(elem => {
    //just fixing up the types api call
    axios.get(`https://pokeapi.co/api/v2/type/${elem}`).then(res => {
        let type = res.data
        console.log(type.name)
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

        // console.log(`${pokemon.name} type: ${correspondingType}`)
    }); 
    
})