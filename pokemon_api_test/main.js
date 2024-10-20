const axios = require('axios');


const pokemon = axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then((response) => {
    console.log(response.data);
    //abilities
    response.data.abilities.forEach((ability) => {
        console.log(ability.ability.name);
        console.log(ability.ability.url);
        axios.get(ability.ability.url).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    });
}).catch((error) => {
    console.log(error);
});

