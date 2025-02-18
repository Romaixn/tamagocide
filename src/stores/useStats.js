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
    death: null, // { isDead: boolean, reason: string }
    incrementStat: (stat, amount) =>
      set((state) => {
        if (state.death?.isDead) return { ...state };

        const newValue = state.stats[stat] + amount;
        const clampedValue = stat === 'happy' ? Math.min(newValue, 100) : newValue;
        const isDead = clampedValue <= 0 || (stat === 'hungry' && clampedValue >= 200);
        const reason = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          death: isDead ? { isDead: true, reason } : null,
        };
      }),
    decrementStat: (stat, amount) =>
      set((state) => {
        if (state.death?.isDead) return { ...state };

        const newValue = state.stats[stat] - amount;
        const clampedValue = Math.max(newValue, 0);
        const isDead = clampedValue <= 0;
        const reason = isDead ? getReasonOfDeath(stat, clampedValue) : '';

        return {
          ...state,
          stats: {
            ...state.stats,
            [stat]: clampedValue,
          },
          death: isDead ? { isDead: true, reason } : null,
        };
      }),
    eatBadFood: () =>
      set((state) => {
        if (state.badFoodsEaten >= 5 || state.consecutiveBadFoods >= 3) {
          const reason = getReasonOfDeath('sick', state.badFoodsEaten);

          return {
            ...state,
            death: { isDead: true, reason },
            badFoodsEaten: state.badFoodsEaten + 1,
            consecutiveBadFoods: state.consecutiveBadFoods + 1,
          };
        }

        return {
          ...state,
          badFoodsEaten: state.badFoodsEaten + 1,
          consecutiveBadFoods: state.consecutiveBadFoods + 1,
        };
      }),
    resetConsecutiveBadFoods: () => set((state) => ({ ...state, consecutiveBadFoods: 0 })),
  })),
);

const getReasonOfDeath = (stat, clampedValue) => {
  if (stat === 'hungry' && clampedValue >= 200) {
    return 'overfed';
  }

  return stat;
};
