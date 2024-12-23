import { create } from "zustand";

const useDataStore = create((set) => ({
  data: [],
  loading: false,
  status: true,

  setData: (data) => set({ data: [...data], status: false }),
  removeData: () => set(() => ({ data: [] })),
  setRefetch: () => set({ status: true }),
}));

export default useDataStore;
