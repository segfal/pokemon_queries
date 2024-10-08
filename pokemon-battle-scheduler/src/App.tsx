import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PokemonCard from './Components/PokemonCard';

interface Pokemon {
  name: string;
  types: string[];
  image: string;
}

const Container = styled.div`
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
  font-size: 2em;
  color: #ffcb05;
  text-shadow: 2px 2px #3b4cca;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
`;

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonList: Pokemon[] = [];
      for (let i = 1; i <= 20; i++) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon: Pokemon = {
          name: res.data.name,
          types: res.data.types.map((typeInfo: any) => typeInfo.type.name),
          image: res.data.sprites.front_default,
        };
        pokemonList.push(pokemon);
      }
      setPokemons(pokemonList);
    };

    fetchPokemons();
  }, []);

  return (
    <Container>
      <Title>Pokémon Pokédex</Title>
      <Grid>
        {pokemons.map((pokemon, index) => (
          <motion.div
            key={pokemon.name}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <PokemonCard pokemon={pokemon} />
          </motion.div>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
