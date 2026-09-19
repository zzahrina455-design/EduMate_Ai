import { create } from 'zustand';

export type UserRole = 'mahasiswa' | 'dosen' | 'admin' | 'dev';

export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: { title: string; page: number; score: number }[];
}

interface UserUIState {
  session: UserSession | null;
  currentTheme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeTab: string;
  messages: ChatMessage[];
  documents: { id: number; title: string; type: string; status: string; date: string }[];
  setSession: (session: UserSession | null) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  addDocument: (doc: { id: number; title: string; type: string; status: string; date: string }) => void;
  deleteDocument: (id: number) => void;
}

export const useUserUIStore = create<UserUIState>((set) => ({
  session: {
    id: 1,
    name: 'Mahasiswa Demo (Zam Zam / Rita)',
    email: 'student@vokasi.uns.ac.id',
    role: 'mahasiswa',
    token: 'jwt-token-edumate-2026',
  },
  currentTheme: 'light',
  sidebarOpen: true,
  activeTab: 'chat',
  messages: [
    {
      id: '1',
      sender: 'ai',
      text: 'Halo! Saya EduMate AI, asisten pembelajaran cerdas berbasis RAG untuk D3 Teknik Informatika SV UNS. Ada yang ingin Anda tanyakan seputar RPS, modul, atau jurnal perkuliahan hari ini?',
      timestamp: '10:00',
      sources: [{ title: 'RPS Manajemen Proyek TI 2026.pdf', page: 3, score: 0.94 }]
    }
  ],
  documents: [
    { id: 1, title: 'RPS Manajemen Proyek TI 2026.pdf', type: 'RPS', status: 'Selesai (Indexed)', date: '2026-08-24' },
    { id: 2, title: 'Modul Praktikum Front-End v4.pdf', type: 'Modul', status: 'Selesai (Indexed)', date: '2026-08-26' },
    { id: 3, title: 'Jurnal RAG & Vector Database IEEE.pdf', type: 'Jurnal', status: 'Selesai (Indexed)', date: '2026-09-01' }
  ],
  setSession: (session) => set({ session }),
  toggleTheme: () => set((state) => ({ currentTheme: state.currentTheme === 'light' ? 'dark' : 'light' })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveTab: (activeTab) => set({ activeTab }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
  addDocument: (doc) => set((state) => ({ documents: [doc, ...state.documents] })),
  deleteDocument: (id) => set((state) => ({ documents: state.documents.filter(d => d.id !== id) })),
}));
