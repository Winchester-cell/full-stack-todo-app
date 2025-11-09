import { create } from 'zustand';

export const useProjectsPaginationStore = create((set) => ({

    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    totalPages: 1,
    setTotalPages: (total) => set({ totalPages: total }),

}))