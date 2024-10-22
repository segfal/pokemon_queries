import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';


interface PokemonCardProps {
  pokemon: {
    name: string;
    types: string[];
    image: string;
  };
}

const Card = styled.article`
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  min-width: 260px;
  height: 330px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const PokemonImage = styled.img`
  width: 156px;
  height: 156px;
  image-rendering: pixelated;
`;

const PokemonName = styled.h2`
  font-size: 1.2em;
  color: #ffcb05;
  text-shadow: 1px 1px #3b4cca;
`;

const MapList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const TypeBadge = styled.span<{ color: string }>`
  background-color: ${({ color }) => color};
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  margin: 0 2px;
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
  }, []);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      bug: '#A8B820',
      dark: '#705848',
      dragon: '#6F35FC',
      electric: '#F8D030',
      fairy: '#EE99AC',
      fighting: '#C03028',
      fire: '#F08030',
      flying: '#A98FF3',
      ghost: '#705898',
      grass: '#78C850',
      ground: '#E0C068',
      ice: '#98D8D8',
      normal: '#A8A878',
      poison: '#A040A0',
      psychic: '#F85888',
      rock: '#B8A038',
      steel: '#B8B8D0',
      water: '#6890F0',
    };
    return colors[type] || '#68A090';
  };

  return (
    <Card ref={cardRef}>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />
      <PokemonName>{pokemon.name.toUpperCase()}</PokemonName>
      <MapList>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} color={getTypeColor(type)}>
            {type.toUpperCase()}
          </TypeBadge>
        ))}
      </MapList>
    </Card>
  );
};

export default PokemonCard;