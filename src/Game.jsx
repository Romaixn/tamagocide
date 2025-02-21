import React from 'react';
import * as THREE from 'three';
import { CameraControls, Center, Environment, Sky } from '@react-three/drei';
import { Bedroom } from './components/Bedroom';
import { Pet } from './components/Pet';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import { FoodSpawner } from './components/Foods';
import { ToySpawner } from './components/Toys';
import { Lights } from './Lights';
import { Effects } from './Effects';
import { useGame } from './stores/useGame';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useRef } from 'react';
import useSound from './stores/useSound';

const isDebug = window.location.hash === '#debug';

export const Game = () => {
  const { maxDistance, minDistance, minAzimuthAngle, maxAzimuthAngle, maxPolarAngle } = useControls('Camera', {
    maxDistance: { value: 6, min: 4, max: 100 },
    minDistance: { value: 4, min: 0, max: 4 },
    minAzimuthAngle: { value: -Math.PI / 4, min: -Math.PI / 2, max: 0 },
    maxAzimuthAngle: { value: Math.PI / 1.5, min: Math.PI / 2, max: Math.PI },
    maxPolarAngle: { value: Math.PI / 2, min: Math.PI / 4, max: Math.PI },
  });

  const { spawnAreaSize, foodSpawnInterval, toySpawnInterval } = useControls('Spawning', {
    spawnAreaSize: { value: 2.8, min: 1, max: 20 },
    foodSpawnInterval: { value: 10000, min: 1000, max: 60000, step: 1000 },
    toySpawnInterval: { value: 25000, min: 1000, max: 60000, step: 1000 },
  });

  const phase = useGame((state) => state.phase);
  const soundPlaying = useSound((state) => state.soundPlaying);
  const deathSound = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const deathAudio = new THREE.Audio(listener);
    const loader = new THREE.AudioLoader();
    loader.load('/assets/sound/dead.mp3', (buffer) => {
      deathAudio.setBuffer(buffer);
      deathAudio.setLoop(false);
      deathAudio.setVolume(1);
      deathSound.current = deathAudio;
    });

    return () => {
      deathAudio.stop();
      camera.remove(listener);
    };
  });

  useEffect(() => {
    if (phase === 'dead' && soundPlaying && deathSound.current) {
      deathSound.current.play();
    }
  }, [phase, soundPlaying]);

  return (
    <>
      {isDebug && <Perf position="top-left" />}

      <Environment preset="apartment" />
      <Sky sunPosition={[-0.5, 0.2, 0]} />
      <Lights />
      <CameraControls
        makeDefault
        maxDistance={maxDistance}
        minDistance={minDistance}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        maxPolarAngle={maxPolarAngle}
      />
      <Physics timeStep="vary" debug={isDebug}>
        <Center>
          <Bedroom scale={0.6} rotation-y={-Math.PI / 2} />
          <Pet scale={0.5} />
          <FoodSpawner spawnAreaSize={spawnAreaSize} spawnInterval={foodSpawnInterval} />
          <ToySpawner spawnAreaSize={spawnAreaSize} spawnInterval={toySpawnInterval} />
        </Center>
      </Physics>
      {/* <Effects /> */}
    </>
  );
};
