import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { WiggleBone } from 'wiggle';
import { useFrame } from '@react-three/fiber';
import DraggableRigidBody from './controls/DraggableRigidBody';
import { useState } from 'react';
import { useStatsStore } from '../stores/useStats';
import { useFoodStore, useToyStore } from '../stores/useProps';
import { useGame } from '../stores/useGame';
import { BadFood } from './Foods';

const DraggableRigidBodyProps = {
  rigidBodyProps: {
    gravityScale: 3.5,
    linearDamping: 5,
    angularDamping: 0.2,
  },
  boundingBox: [
    [-2, 2.5],
    [-1.5, 1],
    [-2, 2.5],
  ],
  dragControlsProps: {
    preventOverlap: true,
  },
  resetPositionOnFall: true,
};

const decreaseStatsOverTime = (decrementStat) => {
  const intervalId = setInterval(() => {
    decrementStat('hungry', 5);
    decrementStat('happy', 5);
  }, 5000);

  return () => clearInterval(intervalId);
};

export function Pet(props) {
  const { nodes, scene, materials } = useGLTF('/assets/models/pet.glb');
  const wiggleBones = useRef([]);
  const bonesAlreadyWiggled = useRef([]);
  const petRigidBodyRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpTarget, setJumpTarget] = useState(new THREE.Vector3());
  const [interactedObjects, setInteractedObjects] = useState(new Set());
  const interactionCooldown = useRef(new Map());

  const hungryStat = useStatsStore((state) => state.stats.hungry);
  const happyStat = useStatsStore((state) => state.stats.happy);
  const badFoodsEaten = useStatsStore((state) => state.badFoodsEaten);
  const consecutiveBadFoods = useStatsStore((state) => state.consecutiveBadFoods);

  const incrementStat = useStatsStore((state) => state.incrementStat);
  const decrementStat = useStatsStore((state) => state.decrementStat);
  const eatBadFood = useStatsStore((state) => state.eatBadFood);
  const resetConsecutiveBadFoods = useStatsStore((state) => state.resetConsecutiveBadFoods);
  const { toyItems, removeToy } = useToyStore();
  const { foodItems, removeFood } = useFoodStore();

  const phase = useGame((state) => state.phase);

  const scaleFactor = 0.5 + ((hungryStat - 100) / 100) * 0.05;

  useEffect(() => {
    wiggleBones.current.length = 0;
    bonesAlreadyWiggled.length = 0;
    nodes.RootBone.traverse((bone) => {
      if (bone.isBone && bone !== nodes.RootBone) {
        if (!bonesAlreadyWiggled.current.includes(bone.uuid)) {
          const wiggleBone = new WiggleBone(bone, {
            velocity: 0.2,
          });
          wiggleBones.current.push(wiggleBone);
          bonesAlreadyWiggled.current.push(bone.uuid);
        }
      }
    });

    const cleanupStatsInterval = decreaseStatsOverTime(decrementStat);

    setInteractedObjects(new Set());

    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });

      cleanupStatsInterval();
    };
  }, []);

  const findClosestObject = (objects, isFood = false) => {
    let closestObject = null;
    let minDistance = Infinity;
    let bestScore = -Infinity;

    if (!petRigidBodyRef.current) return null;
    const petPosition = petRigidBodyRef.current.getRigidBody().translation();
    const petPositionThree = new THREE.Vector3(petPosition.x, petPosition.y, petPosition.z);

    objects.forEach((object) => {
      const objectPosition = object.position;
      const distance = petPositionThree.distanceTo(objectPosition);

      let score = 0;

      if (isFood) {
        const isBad = BadFood.includes(object.component);
        if (hungryStat >= 150 && isBad) {
          score = -distance * 2;
        } else if (hungryStat < 50) {
          score = 100 / (distance + 0.1);
        } else if (hungryStat >= 50 && hungryStat < 100 && !isBad) {
          score = 50 / (distance + 0.1);
        } else if (hungryStat >= 100) {
          score = -distance;
        }
      } else {
        // Toy
        if (happyStat < 80) {
          score = 100 / (distance + 0.1);
        } else {
          score = 50 / (distance + 0.1);
        }
      }

      if (score > bestScore) {
        bestScore = score;
        closestObject = object;
      }
    });

    return closestObject;
  };

  useFrame(() => {
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });

    if (!petRigidBodyRef.current) return;

    const rigidBody = petRigidBodyRef.current.getRigidBody();
    if (!rigidBody) return;

    if (phase !== 'dead' && !isJumping && rigidBody.isSleeping()) {
      const petPosition = petRigidBodyRef.current.getRigidBody().translation();
      const petPositionThree = new THREE.Vector3(petPosition.x, petPosition.y, petPosition.z);
      const closestFood = findClosestObject(foodItems, true);
      const closestToy = findClosestObject(toyItems);
      let closestObject = null;

      if (closestFood && hungryStat >= 100) {
        const distanceToFood = petPositionThree.distanceTo(closestFood.position);
        if (distanceToFood < 1) {
          const fleeDirection = petPositionThree.clone().sub(closestFood.position).normalize();
          startJump(petPositionThree.clone().add(fleeDirection));
          return;
        }
      }

      if (hungryStat < 60 && closestFood) {
        closestObject = closestFood;
      } else if (happyStat < 70 && closestToy) {
        closestObject = closestToy;
      } else if (closestFood && closestToy) {
        const distanceToFood = petPositionThree.distanceTo(closestFood.position);
        const distanceToToy = petPositionThree.distanceTo(closestToy.position);
        if (distanceToFood * 0.7 + Math.random() * 3 < distanceToToy) {
          closestObject = closestFood;
        } else {
          closestObject = closestToy;
        }
      } else {
        closestObject = closestToy;
      }

      if (closestObject) {
        startJump(closestObject.position);
      } else if (Math.random() < 0.02) {
        startJump();
      }
    }

    if (isJumping && rigidBody.isSleeping()) {
      const currentPosition = rigidBody.translation();
      const jumpDirection = jumpTarget.clone().sub(currentPosition).normalize();

      rigidBody.applyImpulse({ x: jumpDirection.x * 5, y: 5, z: jumpDirection.z * 5 }, true);
    }
  });

  const startJump = (targetPosition = null) => {
    setIsJumping(true);

    if (targetPosition) {
      setJumpTarget(targetPosition);
    } else {
      const angle = Math.random() * 2 * Math.PI;
      const radius = 0.5;
      const targetX = Math.cos(angle) * radius;
      const targetZ = Math.sin(angle) * radius;

      setJumpTarget(new THREE.Vector3(targetX, 0, targetZ));
    }

    setTimeout(() => {
      setIsJumping(false);
    }, 800);
  };

  const handleCollision = (event) => {
    const collider = event.collider;
    const objectKey = collider?._parent.userData?.key;
    if (!objectKey || interactedObjects.has(objectKey)) return;

    if (interactionCooldown.current.has(objectKey)) return;

    const toy = collider?._parent.userData?.isToy ?? false;
    const food = collider?._parent.userData?.isFood ?? false;

    if (toy) {
      const toyItem = toyItems.find((item) => item.key === objectKey);
      if (!toyItem) return;

      removeToy(toyItem.key);
      incrementStat('happy', 20);
      setInteractedObjects((prev) => new Set(prev).add(objectKey));

      const timeoutId = setTimeout(() => {
        setInteractedObjects((prev) => {
          const newSet = new Set(prev);
          newSet.delete(objectKey);
          return newSet;
        });
        interactionCooldown.current.delete(objectKey);
      }, 500);
      interactionCooldown.current.set(objectKey, timeoutId);

      // Little happy jump
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (phase !== 'dead') {
            const jumpDirection = new THREE.Vector3(0, 1, 0);
            petRigidBodyRef.current.getRigidBody().applyImpulse({ x: jumpDirection.x, y: 4, z: jumpDirection.z }, true);
          }
        }, i * 800);
      }
    } else if (food) {
      const foodItem = foodItems.find((item) => item.key === collider._parent.userData.key);
      if (!foodItem) return;

      const isBadFood = BadFood.includes(foodItem.component);
      if (isBadFood) {
        eatBadFood();
      } else {
        resetConsecutiveBadFoods();
      }

      removeFood(foodItem.key);
      incrementStat('hungry', 20);
      setInteractedObjects((prev) => new Set(prev).add(objectKey));

      const timeoutId = setTimeout(() => {
        setInteractedObjects((prev) => {
          const newSet = new Set(prev);
          newSet.delete(objectKey);
          return newSet;
        });
        interactionCooldown.current.delete(objectKey);
      }, 500);
      interactionCooldown.current.set(objectKey, timeoutId);
    }
  };

  return (
    <DraggableRigidBody
      {...DraggableRigidBodyProps}
      visibleMesh={
        <group {...props} dispose={null} scale={scaleFactor} castShadow receiveShadow>
          <skinnedMesh geometry={nodes.Pet_1.geometry} material={materials.Body} skeleton={nodes.Pet_1.skeleton} />
          <skinnedMesh geometry={nodes.Pet_2.geometry} material={materials.White} skeleton={nodes.Pet_2.skeleton} />
          <skinnedMesh geometry={nodes.Pet_3.geometry} material={materials.Black} skeleton={nodes.Pet_3.skeleton} />
          <primitive object={nodes.RootBone} />
        </group>
      }
      ref={petRigidBodyRef}
      onCollisionEnter={handleCollision}
    />
  );
}

useGLTF.preload('/assets/models/pet.glb');

export function Adult(props) {
  const { nodes } = useGLTF('/assets/models/pet-adulte.glb');
  const body = new THREE.MeshStandardMaterial({ color: '#F9CB43' });
  const clothes = new THREE.MeshStandardMaterial({ color: '#FFFFFF' });
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={body} />
          <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={clothes} />
          <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={body} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/pet-adulte.glb');
