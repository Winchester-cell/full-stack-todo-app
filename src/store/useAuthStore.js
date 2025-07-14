import { create } from 'zustand';

export const useAuthStore = create((set) => ({

    isLoggedIn: false,

    setIsLoggedIn: (status) => set({ isLoggedIn: status }),

    user: null ,

    setUser: (newUser) => set({ user: newUser }),

}))