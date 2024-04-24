import create from "zustand";

const useTokenStore = create((set) => ({
  token: [],
  setToken: (value: string) => set({ token: value }),
}));

export default useTokenStore;
