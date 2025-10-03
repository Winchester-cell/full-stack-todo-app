import { create } from 'zustand';

export const useTodoStore = create((set) => ({

    todos: [],

    setTodos: (newTodos) => set({ todos: newTodos }),

    isSearching: false,

    setIsSearching: (newStat) => set({ isSearching: newStat })

}))