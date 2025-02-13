import { useEffect, useRef } from 'react';
import { Meter, UI } from '@alienkitty/space.js';
import { css } from '../../../styled-system/css';
import useSound from '@/stores/useSound';
import { useStatsStore } from '../../stores/useStats';

const HUD = () => {
  const containerRef = useRef(null);
  const uiInstance = useRef(null);
  const meterHungry = useRef(null);
  const meterHappiness = useRef(null);
  const animationFrameRef = useRef(null);
  const toggleSound = useSound((state) => state.toggleSound);
  const soundPlaying = useSound((state) => state.soundPlaying);
  const isDetailsShown = useRef(true);
  const { stats } = useStatsStore();

  useEffect(() => {
    if (!containerRef.current) return;

    let i = 0;

    // Initialize UI instance with all components
    uiInstance.current = new UI({
      fps: false,
      header: {
        links: [
          {
            title: 'Tamagocide - rherault',
            link: 'https://rherault.dev',
          },
        ],
      },
      details: {
        background: true,
        title: 'How to play?',
        content: `TODO`,
      },
      detailsButton: false,
      muteButton: {
        sound: soundPlaying,
        callback: () => {
          // Necessary to prevent callback at initialization (idk why)
          ++i;
          if (i > 1) {
            toggleSound();
          }
        },
      },
    });

    meterHungry.current = new Meter({
      suffix: ' HUNGRY',
      value: stats.hungry,
      range: 100,
      width: 100,
      noRange: true,
      noGradient: false,
    });
    meterHungry.current.animateIn();

    meterHappiness.current = new Meter({
      suffix: ' HAPPY',
      value: stats.happy,
      range: 100,
      width: 100,
      noRange: true,
      noGradient: false,
    });
    meterHappiness.current.animateIn();

    // Animate in the UI
    uiInstance.current.animateIn();
    uiInstance.current.toggleDetails(true);

    const unsubscribeHungry = useStatsStore.subscribe((state) => {
      if (meterHungry.current) {
        meterHungry.current.update(state.stats.hungry);
      }
    });

    const unsubscribeHappiness = useStatsStore.subscribe((state) => {
      if (meterHappiness.current) {
        meterHappiness.current.update(state.stats.happy);
      }
    });

    // Handle key press or touch press for details
    const handleKeyOrTouchPress = () => {
      if (isDetailsShown.current) {
        uiInstance.current.toggleDetails(false);
        isDetailsShown.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyOrTouchPress);
    window.addEventListener('click', handleKeyOrTouchPress);

    containerRef.current.appendChild(uiInstance.current.element);
    containerRef.current.appendChild(meterHungry.current.element);
    containerRef.current.appendChild(meterHappiness.current.element);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      uiInstance.current?.update();
      meterHungry.current?.update();
      meterHappiness.current?.update();
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyOrTouchPress);
      window.removeEventListener('click', handleKeyOrTouchPress);
      if (uiInstance.current && uiInstance.current.element && containerRef.current) {
        containerRef.current.removeChild(uiInstance.current.element);
        uiInstance.current = null;
        containerRef.current.removeChild(meterHungry.current.element);
        meterHungry.current = null;
        containerRef.current.removeChild(meterHappiness.current.element);
        meterHappiness.current = null;
      }

      unsubscribeHappiness();
      unsubscribeHungry();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={css({
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
      })}
    />
  );
};

export default HUD;
