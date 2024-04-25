import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// const useTokenStore = create((set) => ({
//   token: [],
//   setToken: (value: string) => set({ token: value }),
// }));

interface tokenType {
  token : [];
  setToken : (value : []) => void
}

const userTokenStore = create(
  persist<tokenType>(
    (set)=>({
      token : [],
      setToken : (value) => set({token : value}),
    }),
    {
      name : 'userIdStorage'
    }
  )
)

export default userTokenStore;
