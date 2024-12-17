import { create } from "zustand";
import AxiosInt from "../api/api";

const useTrendingData = create((set, get) => ({
  post: [],
  loading: false,

  setPost: async () => {
    // fetch the post
    set({ loading: true });
    try {
      let { data } = await AxiosInt.get("/post/trending");
      let fillterData = data?.data?.length > 0 ? data.data[0] : [];
      set({ post: fillterData });
    } catch (err) {
      set({ post: [] });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTrendingData;
