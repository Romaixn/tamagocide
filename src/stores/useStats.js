import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStatsStore = create(
  subscribeWithSelector((set) => ({
    stats: {
      hungry: 100,
      happy: 100,
    },
    incrementStat: (stat, amount) =>
      set((state) => ({
        ...state,
        stats: {
          ...state.stats,
          [stat]: state.stats[stat] + amount,
        },
      })),
    decrementStat: (stat, amount) =>
      set((state) => ({
        ...state,
        stats: {
          ...state.stats,
          [stat]: state.stats[stat] - amount,
        },
      })),
  })),
);
