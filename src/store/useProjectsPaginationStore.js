import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProjectsPaginationStore = create(
    persist(
        (set) => ({
            currentPage: 1,
            setCurrentPage: (page) => set({ currentPage: page }),

            totalPages: 1,
            setTotalPages: (total) => set({ totalPages: total }),
        }),
        {
            name: 'projects-pagination',
        }
    )
)
