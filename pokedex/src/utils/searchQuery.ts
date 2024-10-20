import axios from 'axios';

interface Pokemon {
  name: string;
  types: string[];
  image: string;
}

let allPokemon: Pokemon[] = [];

export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  if (allPokemon.length > 0) {
    return allPokemon;
  }

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const results = response.data.results;

    allPokemon = await Promise.all(
      results.map(async (result: { name: string; url: string }) => {
        const pokemonResponse = await axios.get(result.url);
        return {
          name: pokemonResponse.data.name,
          types: pokemonResponse.data.types.map((typeInfo: any) => typeInfo.type.name),
          image: pokemonResponse.data.sprites.front_default,
        };
      })
    );

    return allPokemon;
  } catch (error) {
    console.error("Error fetching all Pokemon:", error);
    return [];
  }
};

export const searchPokemon = (query: string): Pokemon[] => {
  return allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(query.toLowerCase())
  );
};

export const getPokemonBatch = (start: number, batchSize: number): Pokemon[] => {
  return allPokemon.slice(start, start + batchSize);
};
