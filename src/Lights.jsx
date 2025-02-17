import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three';

export function Lights() {
  const light = useRef();
  const light2 = useRef();
  const { lightHelper } = useControls('Lights', {
    lightHelper: false,
  });
  useHelper(lightHelper && light, THREE.DirectionalLightHelper, 1);
  useHelper(lightHelper && light2, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <directionalLight
        ref={light}
        position={[-4, 2, 0]}
        intensity={2}
        distance={10}
        decay={2}
        color={'#ffffe0'}
        castShadow
        shadow-bias={-0.0003}
      />

      <directionalLight
        ref={light2}
        position={[2, 2, 2]}
        intensity={2}
        distance={10}
        decay={2}
        color={'#F5F5DC'}
        shadow-bias={-0.001}
        castShadow
      />
    </>
  );
}
