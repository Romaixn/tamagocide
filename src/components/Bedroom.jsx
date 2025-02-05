import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

export function Bedroom(props) {
  const { nodes, materials } = useGLTF('/assets/models/bedroom.glb');
  return (
    <group {...props} dispose={null}>
      <RigidBody type="fixed" position={[-2.66, 0.203, 2.206]} colliders="trimesh">
        <mesh castShadow receiveShadow geometry={nodes.Bed_frame.geometry} material={materials.Frame} />
      </RigidBody>
      {/* Bed */}
      <RigidBody type="fixed" position={[-2.66, 0.875, 2.206]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube011.geometry} material={materials.White} />
          <mesh castShadow receiveShadow geometry={nodes.Cube011_1.geometry} material={materials.Pillow} />
          <mesh castShadow receiveShadow geometry={nodes.Cube011_2.geometry} material={materials.Blanket} />
        </group>
      </RigidBody>
      {/* Pillow on bed */}
      <RigidBody type="fixed" position={[-2.66, 1.337, 3.599]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube012.geometry} material={materials.Blanket} />
          <mesh castShadow receiveShadow geometry={nodes.Cube012_1.geometry} material={materials.Pillow} />
        </group>
      </RigidBody>
      {/* Sofa under the window */}
      <RigidBody type="fixed" position={[-0.007, 0.204, 3.486]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube008.geometry} material={materials.Frame} />
          <mesh castShadow receiveShadow geometry={nodes.Cube008_1.geometry} material={materials.Blanket} />
          <mesh castShadow receiveShadow geometry={nodes.Cube008_2.geometry} material={materials['Pin picture.001']} />
        </group>
      </RigidBody>
      {/* Pillows */}
      <RigidBody type="dynamic" position={[0.153, 1.239, 3.649]}>
        <mesh castShadow receiveShadow geometry={nodes.Pillow001.geometry} material={materials.Pillow} />
      </RigidBody>
      <RigidBody type="dynamic" position={[0.59, 1.285, 3.771]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow002.geometry}
          material={materials.Pillow}
          rotation={[-1.18, 0.143, 0.13]}
        />
      </RigidBody>
      {/* Library */}
      <RigidBody type="fixed" position={[2.63, 0.204, 3.657]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube016.geometry} material={materials.Frame} />
          <mesh castShadow receiveShadow geometry={nodes.Cube016_1.geometry} material={materials['Pin picture.001']} />
        </group>
      </RigidBody>
      {/* Books */}
      <group position={[3.378, 1.88, 3.675]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube020.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube020_1.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cube020_2.geometry} material={materials.Blue} />
        <mesh castShadow receiveShadow geometry={nodes.Cube020_3.geometry} material={materials.Yellow} />
      </group>
      <group position={[2.587, 2.612, 3.682]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube022.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube022_1.geometry} material={materials.Yellow} />
        <mesh castShadow receiveShadow geometry={nodes.Cube022_2.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cube022_3.geometry} material={materials.Blue} />
      </group>
      <group position={[3.394, 1.271, 3.672]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube028.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube028_1.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cube028_2.geometry} material={materials.Blue} />
        <mesh castShadow receiveShadow geometry={nodes.Cube028_3.geometry} material={materials.Yellow} />
      </group>
      <group position={[2.496, 1.877, 3.672]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube040.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube040_1.geometry} material={materials.Blue} />
        <mesh castShadow receiveShadow geometry={nodes.Cube040_2.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cube040_3.geometry} material={materials.Yellow} />
      </group>
      {/* Photo on lib */}
      <group position={[2.568, 1.491, 3.646]} rotation={[0, 0.315, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube015.geometry} material={materials.Frame} />
        <mesh castShadow receiveShadow geometry={nodes.Cube015_1.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube015_2.geometry} material={materials['Pin picture.002']} />
      </group>
      <group position={[1.911, 1.491, 3.646]} rotation={[0, -0.354, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube019.geometry} material={materials.Frame} />
        <mesh castShadow receiveShadow geometry={nodes.Cube019_1.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube019_2.geometry} material={materials['Pin picture']} />
      </group>

      {/* Desk */}
      <RigidBody type="fixed" position={[-3.23, 0.198, -1.541]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube017.geometry} material={materials.Frame} />
          <mesh castShadow receiveShadow geometry={nodes.Cube017_1.geometry} material={materials['Pin picture.001']} />
        </group>
      </RigidBody>

      {/* Coffe table */}
      <RigidBody type="dynamic" position={[1.197, 0.554, -0.881]}>
        <mesh castShadow receiveShadow geometry={nodes.Coffe_table.geometry} material={materials.Frame} />
      </RigidBody>
      {/* Coffee */}
      <RigidBody type="dynamic" position={[1.687, 0.667, -0.803]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cylinder005.geometry} material={materials.White} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder005_1.geometry} material={materials.Coffe} />
        </group>
      </RigidBody>
      <RigidBody type="dynamic" position={[1.306, 0.684, -1.454]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cylinder006.geometry} material={materials.White} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder006_1.geometry} material={materials.Coffe} />
        </group>
      </RigidBody>
      {/* Carpet */}
      <group position={[1.186, 0.208, -0.871]} rotation={[0, 0.455, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Pillow} />
        <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.White} />
      </group>
      {/* Cushion */}
      <RigidBody type="dynamic" position={[2.772, 0.282, -0.848]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion.geometry}
          material={materials.Blanket}
          rotation={[0, 0.349, 0]}
        />
      </RigidBody>
      <RigidBody type="dynamic" position={[1.416, 0.282, -2.391]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion001.geometry}
          material={materials.Blanket}
          rotation={[-Math.PI, 1.403, -Math.PI]}
        />
      </RigidBody>

      {/* Bin */}
      <RigidBody type="dynamic" position={[-3.568, 0.174, -3.313]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube035.geometry} material={materials.Blanket} />
          <mesh castShadow receiveShadow geometry={nodes.Cube035_1.geometry} material={materials.Pillow} />
        </group>
      </RigidBody>

      {/* Chair */}
      <RigidBody type="dynamic" position={[-1.738, 1.057, -1.254]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube052.geometry} material={materials.Blanket} />
          <mesh castShadow receiveShadow geometry={nodes.Cube052_1.geometry} material={materials.Frame} />
        </group>
      </RigidBody>

      {/* Screen */}
      <RigidBody type="dynamic" position={[-3.654, 1.444, -1.056]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube021.geometry} material={materials.Pillow} />
          <mesh castShadow receiveShadow geometry={nodes.Cube021_1.geometry} material={materials['Pin picture.001']} />
        </group>
      </RigidBody>
      {/* Keyboard */}
      <RigidBody type="dynamic" position={[-2.953, 1.441, -1.105]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cube023.geometry} material={materials.Pillow} />
          <mesh castShadow receiveShadow geometry={nodes.Cube023_1.geometry} material={materials['Pin picture.001']} />
        </group>
      </RigidBody>
      {/* Plant */}
      <RigidBody type="dynamic" position={[-3.659, 1.445, -2.442]}>
        <group>
          <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} material={materials.Coffe} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder_1.geometry} material={materials.Blanket} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder_2.geometry} material={materials.Leaves} />
          <mesh castShadow receiveShadow geometry={nodes.Cylinder_3.geometry} material={materials.Frame} />
        </group>
      </RigidBody>

      {/* Window */}
      <group position={[0.038, 2.932, 4.276]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube004.geometry} material={materials.Frame} />
        <mesh castShadow receiveShadow geometry={nodes.Cube004_1.geometry} material={materials.Material} />
      </group>

      {/* Cardboard */}
      <group position={[-4.004, 3.051, -1.324]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube050.geometry} material={materials.White} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_1.geometry} material={materials['Pin picture']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_2.geometry} material={materials.Frame} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_3.geometry} material={materials.Board} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_4.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_5.geometry} material={materials['Pin picture.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_6.geometry} material={materials.Yellow} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_7.geometry} material={materials['Pin picture.002']} />
        <mesh castShadow receiveShadow geometry={nodes.Cube050_8.geometry} material={materials.Blue} />
      </group>

      {/* Wallshelf */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wallshelf.geometry}
        material={materials.Frame}
        position={[-3.77, 3.25, 2.269]}
      />
      {/* Plants */}
      <group position={[-3.717, 3.193, 2.867]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder001.geometry} material={materials.Red} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder001_1.geometry} material={materials.Leaves} />
      </group>
      <group position={[-3.74, 2.79, 1.657]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder002.geometry} material={materials.Blue} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder002_1.geometry} material={materials.Leaves} />
      </group>

      {/* Wall */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[0.2, 2.5, 4]} position={[4.2, 2.7, 0]} />
        <CuboidCollider args={[0.2, 2.5, 4]} position={[-4.2, 2.7, 0]} />

        <CuboidCollider args={[4, 2.5, 0.2]} position={[0, 2.7, 4.2]} />
        <CuboidCollider args={[4, 2.5, 0.2]} position={[0, 2.7, -4.2]} />

        <CuboidCollider args={[4, 0.2, 4]} position={[0, 5.3, 0]} />
        <mesh castShadow receiveShadow geometry={nodes.Wall.geometry} material={materials.White} />
      </RigidBody>
      {/* Floor */}
      <RigidBody type="fixed">
        <mesh castShadow receiveShadow geometry={nodes.Floor.geometry} material={materials.White} scale={[4, 0.2, 4]} />
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/assets/models/bedroom.glb');
