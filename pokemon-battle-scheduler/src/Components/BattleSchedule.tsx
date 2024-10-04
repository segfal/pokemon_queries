import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface BestBattleDates {
  [key: string]: {
    count: number;
    startDate: string | null;
    pokemons: string[];
  };
}

interface BattleScheduleProps {
  bestBattleDates: BestBattleDates;
}

const ScheduleContainer = styled.div`
  margin-bottom: 40px;
`;

const ScheduleItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const TypeTitle = styled.h3`
  font-size: 1.5em;
  color: #ffcb05;
  text-shadow: 1px 1px #3b4cca;
`;

const BattleSchedule: React.FC<BattleScheduleProps> = ({ bestBattleDates }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current?.children,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <ScheduleContainer ref={containerRef}>
      {Object.keys(bestBattleDates).map((type, index) => (
        <ScheduleItem key={type} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
          <TypeTitle>{type.toUpperCase()} TYPE</TypeTitle>
          <p>Number of Available Pokémon: {bestBattleDates[type].count}</p>
          <p>Start Date: {bestBattleDates[type].startDate || 'N/A'}</p>
          <p>
            Pokémon: {bestBattleDates[type].pokemons.join(', ')}
          </p>
        </ScheduleItem>
      ))}
    </ScheduleContainer>
  );
};

export default BattleSchedule;