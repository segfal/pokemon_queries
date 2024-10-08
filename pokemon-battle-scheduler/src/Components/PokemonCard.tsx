import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';


interface PokemonCardProps {
  pokemon: {
    name: string;
    types: string[];
    image: string;
  };
  // availability?: string[];
}

const Card = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  width: 240px; /* Fixed width */
  height: 330px; /* Fixed height */
  margin-bottom: 15px;
  &:hover {
    transform: translateY(-10px);
  }
`;

const PokemonImage = styled.img`
  width: 156px;
  height: 156px;
  image-rendering: pixelated;
  margin-bottom: 10px;
`;

const PokemonName = styled.h2`
  font-size: 1.2em;
  color: #ffcb05;
  text-shadow: 1px 1px #3b4cca;
`;

const TypeBadge = styled.span<{ color: string }>`
  background-color: ${({ color }) => color};
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  margin: 0 5px;
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
  }, []);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      // Color mapping as before
    };
    return colors[type] || '#68A090';
  };

  return (
    <Card ref={cardRef}>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />
      <PokemonName>{pokemon.name.toUpperCase()}</PokemonName>
      <div>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} color={getTypeColor(type)}>
            {type.toUpperCase()}
          </TypeBadge>
        ))}
      </div>
    </Card>
  );
};

export default PokemonCard;