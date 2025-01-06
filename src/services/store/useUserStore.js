import { create } from "zustand";

const UserStore = create((set) => ({
  user: {},
  setUser: (data) => set({ user: { ...data } }),
  removeUser: () => set({ user: {} }),
}));

export default UserStore;
