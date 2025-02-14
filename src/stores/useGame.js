import { create } from 'zustand';

export const useGame = create((set) => ({
  phase: 'welcome',
  start: () => set({ phase: 'playing' }),
  dead: () => set({ phase: 'dead' }),
  restart: () => set({ phase: 'welcome' }),
}));
