import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const loadMorePokemons = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const startIndex = (page - 1) * 20 + 1;
    const endIndex = page * 20;
    const newPokemonList: Pokemon[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemon: Pokemon = {
        name: res.data.name,
        types: res.data.types.map((typeInfo: any) => typeInfo.type.name),
        image: res.data.sprites.front_default,
      };
      newPokemonList.push(pokemon);
    }

    setPokemons(prevPokemons => [...prevPokemons, ...newPokemonList]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMorePokemons]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      loadMorePokemons();
    }
  };

  return (
    <Container>
      <Title>Pokémon Pokédex</Title>
      <Grid>
        {pokemons.map((pokemon, index) => (
          <motion.div
            key={`${pokemon.name}-${index}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <PokemonCard pokemon={pokemon} />
          </motion.div>
        ))}
      </Grid>
      <div ref={loader}>
        {loading && <p>Loading more Pokémon...</p>}
      </div>
    </Container>
  );
};

export default App;
