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
  const phase = useGame((state) => state.phase);
  const death = useStatsStore((state) => state.death);

  useEffect(() => {
    if (death?.isDead) {
      dead();
    }
  }, [death, dead]);

  return (
    <>
      <Canvas shadows gl={{ antialias: true, stencil: false }}>
        <color attach="background" args={['#B2EBF2']} />
        <Suspense fallback={null}>{phase !== 'welcome' && <Game />}</Suspense>
      </Canvas>

      {phase !== 'welcome' && <HUD />}

      {phase === 'welcome' && <Welcome />}
      {phase === 'dead' && <FinalMessage death={death} />}
    </>
  );
};

export default Experience;
