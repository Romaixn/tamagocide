import React from 'react';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import { Tamagotchi } from '@/components/Tamagotchi';
import { Canvas } from '@react-three/fiber';

const Experience = () => {
  return (
    <>
      <Canvas>
        <Environment preset="sunset" />
        <OrbitControls makeDefault />

        <Center>
          <Tamagotchi />
        </Center>
      </Canvas>
    </>
  );
};

export default Experience;
