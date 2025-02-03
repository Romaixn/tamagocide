import React from 'react';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bedroom } from './components/Bedroom';
import { Adult, Pet } from './components/Pet';
import { PivotControls } from '@react-three/drei';

const Experience = () => {
  return (
    <>
      <Canvas>
        <pointLight position={[5, 5, 5]} />
        <Environment preset="sunset" />
        <OrbitControls
          makeDefault
          maxDistance={6}
          minDistance={4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 1.5}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
        />
        <Center>
          <Bedroom scale={0.6} rotation-y={-Math.PI / 2} />
          <PivotControls depthTest={false}>
            <Pet scale={2} position={[-0.6, 0.1, 0]} />
          </PivotControls>
        </Center>
      </Canvas>
    </>
  );
};

export default Experience;
