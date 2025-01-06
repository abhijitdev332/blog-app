import { create } from "zustand";

const useDataStore = create((set) => ({
  data: [],
  loading: false,
  status: true,

  setData: (data) =>
    set((state) => ({ data: [...state.data, ...data], status: false })),
  removeData: () => set({ data: [] }),
  setRefetch: () => set({ data: [], status: true }),
}));

export default useDataStore;
