import { create } from 'zustand';

export const useToyStore = create((set) => ({
  toyItems: [],
  addToy: (toy) => set((state) => ({ toyItems: [...state.toyItems, toy] })),
  removeToy: (key) => set((state) => ({ toyItems: state.toyItems.filter((item) => item.key !== key) })),
}));

export const useFoodStore = create((set) => ({
  foodItems: [],
  addFood: (food) => set((state) => ({ foodItems: [...state.foodItems, food] })),
  removeFood: (key) => set((state) => ({ foodItems: state.foodItems.filter((item) => item.key !== key) })),
}));
