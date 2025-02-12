import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Game } from './Game';
import HUD from './components/HUD/HUD';

const Experience = () => {
  return (
    <>
      <Canvas>
        <Game />
      </Canvas>

      <HUD />
    </>
  );
};

export default Experience;
