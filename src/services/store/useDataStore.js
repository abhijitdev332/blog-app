import { create } from "zustand";

const useDataStore = create((set) => ({
  data: [],
  loading: false,
  status: true,

  setData: (data) => set((state) => ({ data: [...data], status: false })),
  removeData: () => set(() => ({ data: [] })),
  setRefetch: () => set((state) => ({ status: true })),
}));

export default useDataStore;
