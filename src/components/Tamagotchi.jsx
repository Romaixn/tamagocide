import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Tamagotchi(props) {
  const { nodes, materials } = useGLTF('/assets/models/tamagotchi.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube3_shell_0.geometry}
          material={materials.shell}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube3_screen_0.geometry}
          material={materials.screen}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder1_buttons_0.geometry}
        material={materials.buttons}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder2_buttons_0.geometry}
        material={materials.buttons}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder3_buttons_0.geometry}
        material={materials.buttons}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/assets/models/tamagotchi.glb')
