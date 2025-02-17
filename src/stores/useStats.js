import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStatsStore = create(
  subscribeWithSelector((set) => ({
    stats: {
      hungry: 100,
      happy: 100,
    },
    isDead: false,
    reasonOfDeath: '',
    incrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] + amount;
        const clampedValue = stat === 'happy' ? Math.min(newValue, 100) : newValue;
        const isDead = clampedValue <= 0 || (stat === 'hungry' && clampedValue >= 200);
        const reasonOfDeath = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          isDead: isDead,
          reasonOfDeath: reasonOfDeath,
        };
      }),
    decrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] - amount;
        const clampedValue = Math.max(newValue, 0);
        const isDead = clampedValue <= 0;
        const reasonOfDeath = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          isDead: isDead,
          reasonOfDeath: reasonOfDeath,
        };
      }),
  })),
);

const getReasonOfDeath = (stat, clampedValue) => {
  if (stat === 'hungry' && clampedValue >= 200) {
    return 'overfed';
  }

  return stat;
};
