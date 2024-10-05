import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PokemonCard from './Components/PokemonCard';
import BattleSchedule from './Components/BattleSchedule';

interface Pokemon {
  name: string;
  types: string[];
  image: string;
}

interface Availability {
  [key: string]: string[];
}

interface BestBattleDates {
  [key: string]: {
    count: number;
    startDate: string | null;
    pokemons: string[];
  };
}


const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const FilterButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: #ffcb05;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Press Start 2P';

  &:hover {
    background-color: #f1c40f;
  }
`;

// Add this inside your App or a suitable component
<FilterContainer>
  {['All', 'Fire', 'Water', 'Grass'].map((type) => (
    <FilterButton key={type} onClick={() => setFilter(type)}>
      {type}
    </FilterButton>
  ))}
</FilterContainer>



const Container = styled.div`
  padding: 20px;
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [availability, setAvailability] = useState<Availability>({});
  const [bestBattleDates, setBestBattleDates] = useState<BestBattleDates>({});

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
      assignAvailability(pokemonList);
    };

    const assignAvailability = (pokemonList: Pokemon[]) => {
      const availabilityData: Availability = {};
      const startDate = new Date('2024-10-01');
      pokemonList.forEach((pokemon) => {
        const dates: string[] = [];
        for (let i = 0; i < 7; i++) {
          if (Math.random() > 0.5) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
          }
        }
        availabilityData[pokemon.name] = dates;
      });
      setAvailability(availabilityData);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length && Object.keys(availability).length) {
      calculateBestBattleDates();
    }
  }, [pokemons, availability]);

  const calculateBestBattleDates = () => {
    const typeGroups: { [key: string]: string[] } = {};
    pokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        if (!typeGroups[type]) typeGroups[type] = [];
        typeGroups[type].push(pokemon.name);
      });
    });

    const bestDates: BestBattleDates = {};
    Object.keys(typeGroups).forEach((type) => {
      const pokemonNames = typeGroups[type];
      const dateCounts: { [key: string]: Set<string> } = {};
      pokemonNames.forEach((name) => {
        const dates = availability[name];
        dates.forEach((date) => {
          if (!dateCounts[date]) dateCounts[date] = new Set();
          dateCounts[date].add(name);
        });
      });

      const sortedDates = Object.keys(dateCounts).sort();
      let maxCount = 0;
      let bestStartDate: string | null = null;
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const firstDay = dateCounts[sortedDates[i]];
        const secondDay = dateCounts[sortedDates[i + 1]];
        const combined = new Set([...firstDay, ...secondDay]);
        if (combined.size > maxCount) {
          maxCount = combined.size;
          bestStartDate = sortedDates[i];
        }
      }
      bestDates[type] = {
        count: maxCount,
        startDate: bestStartDate,
        pokemons: typeGroups[type],
      };
    });
    setBestBattleDates(bestDates);
  };

  return (
    <Container>
      <Title>Pokémon Battle Scheduler</Title>
      <BattleSchedule bestBattleDates={bestBattleDates} />
      <Grid>
  {pokemons.map((pokemon, index) => (
    <motion.div key={pokemon.name} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
      <PokemonCard pokemon={pokemon} availability={availability[pokemon.name]} />
    </motion.div>
  ))}
</Grid>
    </Container>
  );
};

export default App;

function setFilter(type: string): void {
  throw new Error('Function not implemented.');
}
