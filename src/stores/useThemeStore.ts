import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  toggleTheme: () => 
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      return { theme: nextTheme };
    }),
  initTheme: () => {
    // Memuat preferensi terakhir saat aplikasi pertama kali dibuka
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      set({ theme: 'dark' });
    } else {
      document.documentElement.classList.remove('dark');
      set({ theme: 'light' });
    }
  }
}));