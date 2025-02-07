import React from 'react';
import { CameraControls, Center, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bedroom } from './components/Bedroom';
import { Pet } from './components/Pet';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import { FoodSpawner } from './components/Foods';

const isProd = process.env.NODE_ENV === 'production';

const Experience = () => {
  const { maxDistance, minDistance, minAzimuthAngle, maxAzimuthAngle, maxPolarAngle } = useControls('Camera', {
    maxDistance: { value: 6, min: 4, max: 100 },
    minDistance: { value: 4, min: 0, max: 4 },
    minAzimuthAngle: { value: -Math.PI / 4, min: -Math.PI / 2, max: 0 },
    maxAzimuthAngle: { value: Math.PI / 1.5, min: Math.PI / 2, max: Math.PI },
    maxPolarAngle: { value: Math.PI / 2, min: Math.PI / 4, max: Math.PI },
  });

  const { spawnAreaSize, spawnInterval } = useControls('Spawning', {
    spawnAreaSize: { value: 2.8, min: 1, max: 20 },
    spawnInterval: { value: 10000, min: 1000, max: 60000, step: 1000 },
  });

  return (
    <>
      <Canvas>
        {!isProd && <Perf position="top-left" />}

        <pointLight position={[5, 5, 5]} />
        <Environment preset="sunset" />
        <CameraControls
          makeDefault
          maxDistance={maxDistance}
          minDistance={minDistance}
          minAzimuthAngle={minAzimuthAngle}
          maxAzimuthAngle={maxAzimuthAngle}
          maxPolarAngle={maxPolarAngle}
        />
        <Physics timeStep="vary" debug={!isProd}>
          <Center>
            <Bedroom scale={0.6} rotation-y={-Math.PI / 2} />
            <Pet scale={0.5} />
            <FoodSpawner spawnAreaSize={spawnAreaSize} spawnInterval={spawnInterval} />
          </Center>
        </Physics>
      </Canvas>
    </>
  );
};

export default Experience;
