import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useStatsStore = create(
  subscribeWithSelector((set) => ({
    stats: {
      hungry: 100,
      happy: 100,
    },
    badFoodsEaten: 0,
    consecutiveBadFoods: 0,
    isDead: false,
    reasonOfDeath: '',
    incrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] + amount;
        const clampedValue = stat === 'happy' ? Math.min(newValue, 100) : newValue;
        const isDead = clampedValue <= 0 || (stat === 'hungry' && clampedValue >= 200);
        const reasonOfDeath = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          reasonOfDeath: reasonOfDeath,
          isDead: isDead,
        };
      }),
    decrementStat: (stat, amount) =>
      set((state) => {
        const newValue = state.stats[stat] - amount;
        const clampedValue = Math.max(newValue, 0);
        const isDead = clampedValue <= 0;
        const reasonOfDeath = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          reasonOfDeath: reasonOfDeath,
          isDead: isDead,
        };
      }),
    eatBadFood: () =>
      set((state) => {
        if (state.badFoodsEaten >= 5 || state.consecutiveBadFoods >= 3) {
          const reasonOfDeath = getReasonOfDeath('sick', state.badFoodsEaten);

          return {
            reasonOfDeath: reasonOfDeath,
            isDead: true,
          };
        }

        return {
          badFoodsEaten: state.badFoodsEaten + 1,
          consecutiveBadFoods: state.consecutiveBadFoods + 1,
        };
      }),
    resetConsecutiveBadFoods: () => set(() => ({ consecutiveBadFoods: 0 })),
  })),
);

const getReasonOfDeath = (stat, clampedValue) => {
  if (stat === 'hungry' && clampedValue >= 200) {
    return 'overfed';
  }

  return stat;
};
