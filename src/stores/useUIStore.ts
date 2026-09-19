import { create } from 'zustand';

interface UIState {
  // Status Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Status Modal (misalnya modal upload dokumen atau konfirmasi)
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  activeModal: null,
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
}));