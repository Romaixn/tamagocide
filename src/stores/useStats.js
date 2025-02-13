import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStatsStore = create(
  subscribeWithSelector((set) => ({
    stats: {
      hungry: 100,
      happy: 100,
    },
    incrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] + amount;
        const clampedValue = stat === 'happy' ? Math.min(newValue, 100) : newValue;
        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
        };
      }),
    decrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] - amount;
        const clampedValue = Math.max(newValue, 0);
        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
        };
      }),
  })),
);
