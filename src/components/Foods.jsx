import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import { useEffect } from 'react';

export const GoodFood = [Apple, Broccoli, Carrot, Eggplant, Ham, Meat, Pineapple, Tomato];

export const BadFood = [Burger, Croissant, Donut, Fries, HotDog, Pizza, Soda, Sundae, Taco, Wine];

export const FoodSpawner = ({ spawnAreaSize, spawnInterval }) => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const foodType = Math.random() < 0.5 ? GoodFood : BadFood;
      const randomFood = foodType[Math.floor(Math.random() * foodType.length)];

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

      setFoodItems((prevItems) => [
        ...prevItems,
        { component: randomFood, position: newPosition, rotation: newRotation, key: Date.now() },
      ]);
    }, spawnInterval);

    return () => clearInterval(intervalId);
  }, [spawnInterval, spawnAreaSize]);

  const handleFoodClick = (key) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  return (
    <>
      {foodItems.map(({ component: FoodComponent, position, rotation, key }) => (
        <FoodComponent key={key} position={position} rotation={rotation} onClick={() => handleFoodClick(key)} />
      ))}
    </>
  );
};

export function Apple(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/apple.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.apple_1.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.apple_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.apple_1_2.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/apple.glb');

export function Broccoli(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/broccoli.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.broccoli_1.geometry} material={materials.greenDark} />
        <mesh castShadow receiveShadow geometry={nodes.broccoli_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/broccoli.glb');

export function Burger(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/burger.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.bunBottom.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.bunTop.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.cheese.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.patty.geometry} material={materials.brownDark} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/burger.glb');

export function Carrot(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/carrot.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.carrot_1.geometry} material={materials.orange} />
        <mesh castShadow receiveShadow geometry={nodes.carrot_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/carrot.glb');

export function Croissant(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/croissant.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.croissant.geometry} material={materials.brown} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/croissant.glb');

export function Donut(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/donut.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.donutSprinkles_1.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.donutSprinkles_1_1.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.donutSprinkles_1_2.geometry} material={materials.orange} />
        <mesh castShadow receiveShadow geometry={nodes.donutSprinkles_1_3.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.donutSprinkles_1_4.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/donut.glb');

export function Eggplant(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/eggplant.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.eggplant_1.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.eggplant_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/eggplant.glb');

export function Fries(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/fries.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.fries.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.fries_1.geometry} material={materials.yellow} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/fries.glb');

export function Ham(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/ham.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.wholeHam_1.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.wholeHam_1_1.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.wholeHam_1_2.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.wholeHam_1_3.geometry} material={materials.orange} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/ham.glb');

export function HotDog(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/hot-dog.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.hotDog.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.sausage.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.sauce_1.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.sauce_1_1.geometry} material={materials.red} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/hot-dog.glb');

export function Meat(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/meat.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.meatRaw_1.geometry} material={materials.white} />
        <mesh castShadow receiveShadow geometry={nodes.meatRaw_1_1.geometry} material={materials.pink} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/meat.glb');

export function Pineapple(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/pineapple.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.pineapple_1.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.pineapple_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/pineapple.glb');

export function Pizza(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/pizza.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.slice1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice1_1_1.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice1_1_2.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice1_1_3.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice1_1_4.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice2_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice2_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice2_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice2_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice2_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice3_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice3_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice3_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice3_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice3_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice4_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice4_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice4_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice4_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice4_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice5_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice5_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice5_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice5_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice5_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice6_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice6_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice6_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice6_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice6_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice7_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice7_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice7_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice7_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice7_1_4.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.slice8_1.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.slice8_1_1.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.slice8_1_2.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.slice8_1_3.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.slice8_1_4.geometry} material={materials.red} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/pizza.glb');

export function Soda(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/soda.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.soda_1.geometry} material={materials.purple} />
        <mesh castShadow receiveShadow geometry={nodes.soda_1_1.geometry} material={materials._defaultMat} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/soda.glb');

export function Sundae(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/sundae.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.straw.geometry} material={materials.green} />
        <mesh castShadow receiveShadow geometry={nodes.sundae_1.geometry} material={materials._defaultMat} />
        <mesh castShadow receiveShadow geometry={nodes.sundae_1_1.geometry} material={materials.purpleLight} />
        <mesh castShadow receiveShadow geometry={nodes.sundae_1_2.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.cherry_1.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.cherry_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/sundae.glb');

export function Taco(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/taco.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.taco_1.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.taco_1_1.geometry} material={materials.yellow} />
        <mesh castShadow receiveShadow geometry={nodes.taco_1_2.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.taco_1_3.geometry} material={materials.brownDark} />
        <mesh castShadow receiveShadow geometry={nodes.taco_1_4.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/taco.glb');

export function Tomato(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/tomato.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.tomato_1.geometry} material={materials.red} />
        <mesh castShadow receiveShadow geometry={nodes.tomato_1_1.geometry} material={materials.green} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/tomato.glb');

export function Wine(props) {
  const { nodes, materials } = useGLTF('/assets/models/foods/wine.glb');

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <RigidBody type="dynamic" colliders="cuboid" {...props}>
      <group dispose={null} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <mesh castShadow receiveShadow geometry={nodes.wineRed_1.geometry} material={materials.brownDarkest} />
        <mesh castShadow receiveShadow geometry={nodes.wineRed_1_1.geometry} material={materials.brownLight} />
        <mesh castShadow receiveShadow geometry={nodes.wineRed_1_2.geometry} material={materials.brown} />
        <mesh castShadow receiveShadow geometry={nodes.wineRed_1_3.geometry} material={materials.red} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/assets/models/foods/wine.glb');
