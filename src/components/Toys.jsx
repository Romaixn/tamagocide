import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';

export const Toys = [Duck, Gun, Laptop, Monkey, Radio, Skateboard, Television, VirtualPet];

export const ToySpawner = ({ spawnAreaSize, spawnInterval }) => {
  const [toyItems, setToyItems] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomToy = Toys[Math.floor(Math.random() * Toys.length)];

      const newPosition = new THREE.Vector3(
        Math.random() * spawnAreaSize - spawnAreaSize / 2,
        Math.random() * spawnAreaSize,
        Math.random() * spawnAreaSize - spawnAreaSize / 2,
      );

      const newRotation = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      setToyItems((prevItems) => [
        ...prevItems,
        { component: randomToy, position: newPosition, rotation: newRotation, key: Date.now() },
      ]);
    }, spawnInterval);

    return () => clearInterval(intervalId);
  }, [spawnInterval, spawnAreaSize]);

  const handleToyClick = (key) => {
    setToyItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  return (
    <>
      {toyItems.map(({ component: ToyComponent, position, rotation, key }) => (
        <ToyComponent key={key} position={position} rotation={rotation} onClick={() => handleToyClick(key)} />
      ))}
    </>
  );
};

export function Duck(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/duck.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.ducky.geometry} material={materials.tiny_treats_1} scale={100} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/duck.glb');

export function Gun(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/gun.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" scale={0.5} {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.mesh1277069929.geometry} material={materials.mat5} />
        <mesh castShadow receiveShadow geometry={nodes.mesh1277069929_1.geometry} material={materials.mat13} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/gun.glb');

export function Laptop(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/laptop.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.laptop_2.geometry} material={materials.metalDark} />
        <mesh castShadow receiveShadow geometry={nodes.laptop_2_1.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.laptop_2_2.geometry} material={materials.metalMedium} />
        <mesh castShadow receiveShadow geometry={nodes.laptop_3.geometry} material={materials.metalMedium} />
        <mesh castShadow receiveShadow geometry={nodes.laptop_3_1.geometry} material={materials.metalDark} />
        <mesh castShadow receiveShadow geometry={nodes.laptop_3_2.geometry} material={materials.metal} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/laptop.glb');

export function Monkey(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/monkey.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props} scale={0.03}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.Monkey_01_Cube042_1.geometry} material={materials['795548']} />
        <mesh castShadow receiveShadow geometry={nodes.Monkey_01_Cube042_1_1.geometry} material={materials.FFCC88} />
        <mesh castShadow receiveShadow geometry={nodes.Monkey_01_Cube042_1_2.geometry} material={materials['1A1A1A']} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/monkey.glb');

export function Radio(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/radio.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.radio_2.geometry} material={materials.metalMedium} />
        <mesh castShadow receiveShadow geometry={nodes.radio_2_1.geometry} material={materials.wood} />
        <mesh castShadow receiveShadow geometry={nodes.radio_2_2.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.radio_3.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.radio_3_1.geometry} material={materials.metalMedium} />
        <mesh castShadow receiveShadow geometry={nodes.radio_3_2.geometry} material={materials.wood} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/radio.glb');

export function Skateboard(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/skateboard.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.skateboard.geometry} material={materials['colormap.001']} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/skateboard.glb');

export function Television(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/television.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_2.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_2_1.geometry} material={materials.wood} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.televisionVintage_2_2.geometry}
          material={materials.metalMedium}
        />
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_2_3.geometry} material={materials.metalDark} />
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_3.geometry} material={materials.metalDark} />
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_3_1.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.televisionVintage_3_2.geometry} material={materials.wood} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.televisionVintage_3_3.geometry}
          material={materials.metalMedium}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/television.glb');

export function VirtualPet(props) {
  const { nodes, materials } = useGLTF('/assets/models/toys/virtual-pet.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510.geometry} material={materials.mat12} />
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510_1.geometry} material={materials.mat7} />
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510_2.geometry} material={materials.mat16} />
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510_3.geometry} material={materials.mat17} />
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510_4.geometry} material={materials.mat1} />
        <mesh castShadow receiveShadow geometry={nodes.mesh869941510_5.geometry} material={materials.mat23} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/toys/virtual-pet.glb');
