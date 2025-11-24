import { create } from "zustand";

const useNavbarStore = create((set) => ({

    isOpen: false,

    toggleNavbar: () => set((state) => ({ isOpen: !state.isOpen })),

    setIsOpen: (status) => set({ isOpen: status }),

}))

export default useNavbarStore