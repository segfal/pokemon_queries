import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const UniqueCards: React.FC = () => {
    const { pokemonName } = useParams<{ pokemonName: string }>();

    const CardContainer = styled.div`
    text-align: center;
    `

    return (
        <CardContainer>
            <h1> {pokemonName} </h1>
        </CardContainer>
    )
}

export default UniqueCards;