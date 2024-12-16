import { create } from "zustand";

const UserStore = create((set, get) => ({
  user: {},
  setUser: (data) => set(() => ({ user: { ...data } })),
  removeUser: () => set(() => ({ user: {} })),
}));

export default UserStore;
