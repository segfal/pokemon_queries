import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PokemonCard from '../Components/PokemonCard'; // Import the PokemonCard component

const UniqueCards: React.FC = () => {
    const location = useLocation();
    const pokemon = location.state?.pokemon; // Get pokemon from the state

    const PTag = styled.p`
        text-align: center;
        color: #ffcb05; // Text fill color
        font-size: 40px;
        font-weight: bold; // Add boldness if needed to match the Figma design
        text-shadow: 2px 2px #3b4cca;
    `;

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1.8fr;  // Two columns: left and right
        gap: 20px;
        justify-content: center;
        align-items: center;
        height: 70vh;  // Fill the height of the screen
        color: #ffcb05; // Text fill color
        text-shadow: 1px 1px #3b4cca;
        font-size: 1.2em;

    `;

    const CardContainer = styled.div`
        transform: translate(100px, 10px);
    `;

    const StatsContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.2); 
        border: solid 1px black;
        border-radius: 2px;
        box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);        
        transform: translate(-130px);
        font-size: 10px;
        text-shadow: 2px 2px #3b4cca;
    `;

    const StatsBox = styled.div`
        border-bottom: solid 1px white;
        padding: 10px;
        font-size: 1.2em;
        text-shadow: 2px 2px #3b4cca;

    `
    const WeaknessesBox = styled.div`
        border-bottom: solid 1px white;
        border-left: solid 1px white;
        padding: 10px;
        font-size: 1.2em;
        text-shadow: 2px 2px #3b4cca;


    `
    const AbilitiesBox = styled.div`
        border-right: solid 1px white;
        font-size: 1.2em;
        padding: 10px;
        text-shadow: 2px 2px #3b4cca;


    `
    const GeneralFactsBox = styled.div`
        padding: 10px;
        font-size: 1.2em;
        text-shadow: 2px 2px #3b4cca;


    `
    const BoxChildren = styled.div`
        color: white;
    `
    return (
        <>
            <PTag>Pokemon stats</PTag>
            {/* Left side - Pokémon map (image and type) */}
            <GridContainer>
                <CardContainer>
                    {/* <p>{pokemonName}</p> */}
                    {pokemon && (
                        <>
                            <PokemonCard pokemon={pokemon} />
                        </>
                    )}
                </CardContainer>

                {/* Right side - Pokémon stats */}
                <StatsContainer>
                    <StatsBox>
                        <h1>Base Stats</h1>
                        <BoxChildren>
                            <p>HP: 100</p>
                            <p>Attack: 80</p>
                            <p>Special Attack: 90</p>
                            <p>Defense: 70</p>
                            <p>Special Defense: 85</p>
                            <p>Speed: 100</p>
                            <p>Total: 525</p>
                        </BoxChildren>
                    </StatsBox>

                    {/* Upper-right: Weaknesses */}
                    <WeaknessesBox>
                        <h2>Weaknesses</h2>
                        <BoxChildren>
                            <p>Fire</p>
                            <p>Ice</p>
                            <p>Flying</p>
                            <p>Bug</p>
                        </BoxChildren>
                    </WeaknessesBox>

                    {/* Lower-left: Abilities */}
                    <AbilitiesBox>

                        <h2>Abilities</h2>
                        <BoxChildren>
                            <p>Overgrow</p>
                            <p>Chlorophyll (Hidden Ability)</p>
                        </BoxChildren>

                    </AbilitiesBox>

                    {/* Lower-right: General Facts */}
                    <GeneralFactsBox>
                        <h2>General Facts</h2>
                        <BoxChildren>
                            <p>This Pokémon prefers sunny weather and often resides in forests.</p>
                        </BoxChildren>
                    </GeneralFactsBox>
                </StatsContainer>
            </GridContainer>
        </>
    );
};

export default UniqueCards;
