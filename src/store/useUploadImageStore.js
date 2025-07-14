import { create } from 'zustand';

export const useUploadImageStore = create((set) => ({

    showCropper: false,

    setShowCropper: (state) => set({ showCropper: state }),

    selectedFile: null,

    setSelectedFile: (state) => set({ selectedFile: state }),

    image: null,
    setImage: (state) => set({ image: state }), 

}))