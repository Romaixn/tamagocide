import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSound = create(() =>
  persist(
    (set) => ({
      soundPlaying: true,
      toggleSound: () => set({ soundPlaying: !get().soundPlaying }),
    }),
    {
      name: 'sound-storage',
    },
  ),
);

export default useSound;
