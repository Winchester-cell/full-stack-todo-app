import { create } from 'zustand';

export const useProjectsPaginationStore = create((set) => ({

    currentPage: +localStorage.getItem('page') || 1,
    setCurrentPage: (page) => {
        localStorage.setItem('page', page);
        set({ currentPage: page })
    },

    totalPages: 1,
    setTotalPages: (total) => set({ totalPages: total }),

}))