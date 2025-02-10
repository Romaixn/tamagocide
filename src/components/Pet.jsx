import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { WiggleBone } from 'wiggle';
import { useFrame } from '@react-three/fiber';
import DraggableRigidBody from './controls/DraggableRigidBody';
import { useState } from 'react';

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

export function Pet(props) {
  const { nodes, scene, materials } = useGLTF('/assets/models/pet.glb');
  const wiggleBones = useRef([]);
  const petRigidBodyRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpTarget, setJumpTarget] = useState(new THREE.Vector3());

  useEffect(() => {
    wiggleBones.current.length = 0;
    nodes.RootBone.traverse((bone) => {
      if (bone.isBone && bone !== nodes.RootBone) {
        const wiggleBone = new WiggleBone(bone, {
          velocity: 0.2,
        });

        wiggleBones.current.push(wiggleBone);
      }
    });

    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });
    };
  }, [nodes]);

  useFrame(() => {
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });

    if (!petRigidBodyRef.current) return;

    const rigidBody = petRigidBodyRef.current.getRigidBody();
    if (!rigidBody) return;

    if (!isJumping && rigidBody.isSleeping()) {
      if (Math.random() < 0.02) {
        startJump();
      }
    }

    if (isJumping && rigidBody.isSleeping()) {
      const currentPosition = rigidBody.translation();
      const jumpDirection = jumpTarget.clone().sub(currentPosition).normalize();

      rigidBody.applyImpulse({ x: jumpDirection.x * 4, y: 4, z: jumpDirection.z * 4 }, true);
    }
  });

  const startJump = () => {
    setIsJumping(true);

    const angle = Math.random() * 2 * Math.PI;
    const radius = 0.5;
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;

    setJumpTarget(new THREE.Vector3(targetX, 0, targetZ));

    setTimeout(() => {
      setIsJumping(false);
    }, 800);
  };

  return (
    <DraggableRigidBody
      {...DraggableRigidBodyProps}
      visibleMesh={
        <group {...props} dispose={null}>
          <skinnedMesh geometry={nodes.Pet.geometry} material={nodes.Pet.material} skeleton={nodes.Pet.skeleton} />
          <primitive object={nodes.RootBone} />
        </group>
      }
      ref={petRigidBodyRef}
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
