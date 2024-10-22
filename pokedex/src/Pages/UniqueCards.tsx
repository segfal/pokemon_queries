import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PokemonCard from '../Components/PokemonCard'; // Import the PokemonCard component
import axios from 'axios';
import EvolutionChain from '../Components/EvolutionChain';

const UniqueCards: React.FC = () => {
    const location = useLocation();
    const pokemon = location.state?.pokemon; // Get pokemon from the state

    const [pokemonData, setPokemonData] = useState<any>(null);
    const [pokemonDescription, setPokemonDescription] = useState<string>('');
    const [evolutionChain, setEvolutionChain] = useState<any>(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                // Fetch basic Pokemon data
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                setPokemonData(pokemonResponse.data);

                // Fetch Pokemon species data for the description and evolution chain
                const speciesResponse = await axios.get(pokemonResponse.data.species.url);
                const englishFlavorText = speciesResponse.data.flavor_text_entries.find(
                    (entry: any) => entry.language.name === 'en'
                );
                if (englishFlavorText) {
                    setPokemonDescription(englishFlavorText.flavor_text);
                }

                // Fetch evolution chain data
                const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
                setEvolutionChain(evolutionChainResponse.data.chain);

            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        };

        fetchPokemonData();
    }, [pokemon.name])

    const PTag = styled.p`
        text-align: center;
        color: #ffcb05;
        font-size: 40px;
        font-weight: bold;
        text-shadow: 2px 2px #3b4cca;
    `;

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1.8fr;
        gap: 40px;
        justify-content: center;
        align-items: center;
        height: 70vh;
        color: #ffcb05;
        text-shadow: 1px 1px #3b4cca;
        font-size: 1.3em;

    `;

    const CardContainer = styled.div`
        transform: translate(100px, 10px);
        width: 309px;
    `;

    const StatsContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.5); 
        border: solid 1px black;
        border-radius: 2px;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);        
        transform: translate(-130px);
        font-size: 11px;
        text-shadow: 2px 2px #3b4cca;
    `;

    const StatsBox = styled.div`
        border-bottom: solid 1px white;
        padding: 10px;
        font-size: 1.2em;
        text-shadow: 2px 2px #3b4cca;

    `
    const AbilitiesBox = styled.div`
        border-bottom: solid 1px white;
        border-left: solid 1px white;
        padding: 10px;
        font-size: 1.3em;
        text-shadow: 2px 2px #3b4cca;
        line-height: 1.6; 


    `
    const DescriptionBox = styled.div`
        font-size: 1.2em;
        padding: 10px;
        text-shadow: 2px 2px #3b4cca;
        line-height: 1.6; 


    `
    const GeneralFactsBox = styled.div`
        padding: 10px;
        font-size: 1.2em;
        text-shadow: 2px 2px #3b4cca;
        border-right: solid 1px;


    `
    const BoxChildren = styled.div`
        color: white;
    `;

    const EvolutionContainer = styled.div`
        grid-column: 1 / -1;
        width: 100%;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border: solid 1px black;
        border-radius: 2px;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
    `;

    const EvolutionTitle = styled.h2`
        color: #ffcb05;
        text-shadow: 2px 2px #3b4cca;
        text-align: center;
        margin-bottom: 20px;
    `;

    return (
        <>
            <PTag>Pokemon stats</PTag>
            <GridContainer>
                <CardContainer>
                    {pokemon && (
                        <>
                            <PokemonCard pokemon={pokemon} />
                        </>
                    )}
                </CardContainer>

                <StatsContainer>
                    <StatsBox>
                        <h1>Base Stats</h1>
                        <BoxChildren>
                            {pokemonData && pokemonData.stats.map((stat: any) => (
                                <p key={stat.stat.name}> {stat.stat.name.toUpperCase()}: {stat.base_stat} </p>
                            ))}
                            {pokemonData && (
                                <p>TOTAL: {pokemonData.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0)}</p>
                            )}
                        </BoxChildren>
                    </StatsBox>

                    <AbilitiesBox>
                        <h2>Abilities</h2>
                        <BoxChildren>
                            {pokemonData && pokemonData.abilities.map((ability: any) => (
                                <p key={ability.ability.name}>
                                    {ability.ability.name.toUpperCase()} {ability.is_hidden ? "(Hidden Ability)" : ""}
                                </p>
                            ))}
                        </BoxChildren>
                    </AbilitiesBox>

                    <GeneralFactsBox>
                        <h2>General Facts</h2>
                        <BoxChildren>
                            {pokemonData && (
                                <>
                                    <p>HEIGHT: {pokemonData.height / 10} M</p>
                                    <p>WEIGHT: {pokemonData.weight / 10} KG</p>
                                    <p>BASE EXPERIENCE: {pokemonData.base_experience}</p>
                                </>
                            )}
                        </BoxChildren>
                    </GeneralFactsBox>

                    <DescriptionBox>
                        <h2>Description</h2>
                        <BoxChildren>
                            <p>{pokemonDescription.toUpperCase()}</p>
                        </BoxChildren>
                    </DescriptionBox>

                    <EvolutionContainer>
                        <EvolutionTitle>Evolution Chain</EvolutionTitle>
                        {evolutionChain && (
                            <EvolutionChain chain={evolutionChain} />
                        )}
                    </EvolutionContainer>
                </StatsContainer>
            </GridContainer>
        </>
    );
};

export default UniqueCards;
