import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Game } from './Game';
import HUD from './components/HUD/HUD';
import { useGame } from './stores/useGame';
import { Suspense } from 'react';
import Welcome from './Welcome';
import { FinalMessage } from './components/HUD/FinalMessage';
import { useStatsStore } from './stores/useStats';
import { useEffect } from 'react';

const Experience = () => {
  const dead = useGame((state) => state.dead);

  useEffect(() => {
    const unsubscribeDead = useStatsStore.subscribe(
      (state) => state.isDead,
      (isDead) => {
        if (isDead) {
          dead();
        }
      },
    );

    return () => unsubscribeDead();
  }, []);
  const phase = useGame((state) => state.phase);

  return (
    <>
      <Canvas gl={{ antialias: true, stencil: false }}>
        <Suspense fallback={null}>{phase !== 'welcome' && <Game />}</Suspense>
      </Canvas>

      {phase !== 'welcome' && (
        <>
          <HUD />
        </>
      )}

      {phase === 'welcome' && <Welcome />}
      {phase === 'dead' && <FinalMessage />}
    </>
  );
};

export default Experience;
