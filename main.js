const axios = require('axios');

pokemons = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
];

pokemons.map((pokemon) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => {
        //Match it by type
        const types = response.data.types.map((type) => type.type.name);
        console.log(types);
    }).catch((error) => {
        console.log(error);
    });

});


// This code fetches data for a list of Pokémon from the PokeAPI

// The code above does the following:
// 1. It imports the axios library for making HTTP requests.
// 2. It defines an array 'pokemons' containing names of 9 Pokémon.
// 3. It uses the map function to iterate over each Pokémon in the array.
// 4. For each Pokémon, it makes a GET request to the PokeAPI using axios.
// 5. If the request is successful, it extracts the types of the Pokémon from the response data.
// 6. It then logs these types to the console.
// 7. If there's an error in the request, it logs the error to the console.

// This code essentially retrieves and displays the types of each Pokémon in the list.
// It demonstrates how to work with APIs, handle promises, and process JSON data in JavaScript.
