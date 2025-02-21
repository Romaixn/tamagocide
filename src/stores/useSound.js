import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSound = create(
  persist(
    (set) => ({
      soundPlaying: true,
      toggleSound: () => set((state) => ({ soundPlaying: !state.soundPlaying })),
    }),
    {
      name: 'sound-storage',
    },
  ),
);

export default useSound;
