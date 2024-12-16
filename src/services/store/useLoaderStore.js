import { create } from "zustand";

const useLoaderStore = create((set, get) => ({
  status: false,
  setLoading: () => set(() => ({ status: true })),
  removeLoading: () => set(() => ({ status: false })),
}));

export default useLoaderStore;
