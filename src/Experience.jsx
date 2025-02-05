import React from 'react';
import { CameraControls, Center, DragControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bedroom } from './components/Bedroom';
import { Pet } from './components/Pet';
import { Perf } from 'r3f-perf';
import { Physics, RigidBody } from '@react-three/rapier';
import { useControls } from 'leva';
import DraggableRigidBody from './components/controls/DraggableRigidBody';

const isProd = process.env.NODE_ENV === 'production';

const Experience = () => {
  const { maxDistance, minDistance, minAzimuthAngle, maxAzimuthAngle, maxPolarAngle } = useControls('Camera', {
    maxDistance: { value: 6, min: 4, max: 100 },
    minDistance: { value: 4, min: 0, max: 4 },
    minAzimuthAngle: { value: -Math.PI / 4, min: -Math.PI / 2, max: 0 },
    maxAzimuthAngle: { value: Math.PI / 1.5, min: Math.PI / 2, max: Math.PI },
    maxPolarAngle: { value: Math.PI / 2, min: Math.PI / 4, max: Math.PI },
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
            <Pet scale={0.5} position={[0, 2, 0]} />
          </Center>
        </Physics>
      </Canvas>
    </>
  );
};

export default Experience;
