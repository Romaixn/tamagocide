import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStatsStore = create(
  subscribeWithSelector((set) => ({
    stats: {
      hungry: 100,
      happy: 100,
    },
    isDead: false,
    incrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] + amount;
        const clampedValue = stat === 'happy' ? Math.min(newValue, 100) : newValue;
        const isDead = clampedValue <= 0 || (stat === 'hungry' && clampedValue >= 200);

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          isDead: isDead,
        };
      }),
    decrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] - amount;
        const clampedValue = Math.max(newValue, 0);
        const isDead = clampedValue <= 0;

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          isDead: isDead,
        };
      }),
  })),
);
