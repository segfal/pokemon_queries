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

let URL = `https://pokeapi.co/api/v2/pokemon/${pokemons[0]}`

axios.get(URL).then(res => {
    let pokemon = res.data;

    console.log(pokemon.types)

    
    
    //console.log(pokemon)
});



types.map(elem => {
    
    axios.get(URL).then(res => {
        let type = res.data
        console.log(type)
    })
})


pokemons.map(element => {
    let URL = `https://pokeapi.co/api/v2/pokemon/${element}`
    // console.log(element);
    axios.get(URL).then(res => {
        const pokemon = res.data;

        
        
        //console.log(pokemon)
    });
    
})