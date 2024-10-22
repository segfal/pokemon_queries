import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface EvolutionChainProps {
    chain: any;
}

interface PokemonEvolution {
    name: string;
    image: string;
}

const ChainContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`;

const EvolutionStep = styled.figure`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PokemonImage = styled.img`
    width: 100px;
    height: 100px;
`;

const PokemonName = styled.figcaption`
    color: #ffcb05;
    text-shadow: 1px 1px #3b4cca;
    text-align: center;
    margin-top: 10px;
`;

const Arrow = styled.span`
    color: #ffcb05;
    font-size: 24px;
    margin: 0 10px;
`;

const EvolutionChain: React.FC<EvolutionChainProps> = ({ chain }) => {
    const [evolutionData, setEvolutionData] = useState<PokemonEvolution[]>([]);

    useEffect(() => {
        const fetchEvolutionData = async (chainData: any) => {
            const evolutionArray: PokemonEvolution[] = [];

            const processChain = async (data: any) => {
                if (data.species) {
                    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.species.name}`);
                    evolutionArray.push({
                        name: data.species.name,
                        image: pokemonData.data.sprites.front_default,
                    });
                }

                if (data.evolves_to && data.evolves_to.length > 0) {
                    for (const evolution of data.evolves_to) {
                        await processChain(evolution);
                    }
                }
            };

            await processChain(chainData);
            setEvolutionData(evolutionArray);
        };

        fetchEvolutionData(chain);
    }, [chain]);

    return (
        <ChainContainer>
            {evolutionData.map((pokemon, index) => (
                <React.Fragment key={pokemon.name}>
                    <EvolutionStep>
                        <PokemonImage src={pokemon.image} alt={pokemon.name} />
                        <PokemonName>{pokemon.name}</PokemonName>
                    </EvolutionStep>
                    {index < evolutionData.length - 1 && <Arrow>→</Arrow>}
                </React.Fragment>
            ))}
        </ChainContainer>
    );
};

export default EvolutionChain;
