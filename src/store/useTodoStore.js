import { create } from 'zustand';

export const useTodoStore = create((set) => ({

    todos: [],

    setTodos: (newTodos) => set({ todos: newTodos }),

    filterValue: '',

    setFilterValue: (newValue) => set({ filterValue: newValue }),

    isSearching: false,

    setIsSearching: (newStat) => set({ isSearching: newStat })

}))