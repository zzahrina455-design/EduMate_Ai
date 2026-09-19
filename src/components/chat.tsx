import React, { useState, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  source?: string;
}

interface ChatAIProps {
  onNavigate?: (page: string) => void;
}

export default function ChatAI({ onNavigate }: ChatAIProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Halo! Saya asisten EduMate AI. Silakan ketik pertanyaan seputar materi perkuliahan Anda di bawah ini.'
    }
  ]);

  useEffect(() => {
    // Inisialisasi tema
    const isDark = document.documentElement.classList.contains('dark') ||
      (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const toggleHistorySidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulasi balasan AI dengan RAG & Sitasi
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Berdasarkan dokumen resmi perkuliahan, topik tersebut mencakup tata cara implementasi dan analisis performa sistem secara terstruktur.',
        source: '📚 Modul Praktikum Front-End (Hal. 8)'
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Sesi percakapan baru dimulai. Silakan ajukan pertanyaan Anda.'
      }
    ]);
  };

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300 w-full">

      {/* Navbar Atas */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleHistorySidebar} 
              aria-label="Toggle Riwayat" 
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer" 
              title="Lihat Riwayat Percakapan"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm">EM</div>
              <span className="text-sm font-bold tracking-tight">EduMate AI Chat</span>
            </div>
          </div>
          <nav aria-label="Navigasi Chat" className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Dashboard</button>
            <button onClick={() => onNavigate?.('chat')} className="text-white font-semibold cursor-pointer bg-transparent border-none" aria-current="page">Tanya Jawab AI</button>
          </nav>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme} 
              aria-label="Ganti Tema" 
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
            <button onClick={() => onNavigate?.('auth')} className="bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer border-none">Keluar</button>
          </div>
        </div>
      </header>

      {/* Konten Utama dengan Layout Sidebar Toggle */}
      <main className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-6 relative" role="main">
        
        {/* Sidebar Riwayat Sesi */}
        {isSidebarOpen && (
          <aside id="history-sidebar" className="md:col-span-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[76vh] transition-all duration-300" aria-label="Riwayat Percakapan">
            <div className="flex justify-between items-center mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
              <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Riwayat Sesi Chat</h2>
              <button onClick={clearChat} className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 px-2 py-1 rounded-md font-medium cursor-pointer border-none">+ Sesi Baru</button>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">Konsep Dasar Vector DB & Embedding</div>
              <div className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 cursor-pointer">Penerapan Semantic HTML5 & ARIA</div>
              <div className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 cursor-pointer">Implementasi OOP Python & Inheritance</div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <button onClick={() => onNavigate?.('history')} className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-transparent border-none cursor-pointer">Lihat Semua Riwayat Lengkap →</button>
            </div>
          </aside>
        )}

        {/* Area Percakapan Utama */}
        <section id="chat-main-area" className={`${isSidebarOpen ? 'md:col-span-3' : 'md:col-span-4'} bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[76vh] transition-all duration-300`} aria-labelledby="chat-heading">
          <h2 id="chat-heading" className="sr-only">Kotak Percakapan AI</h2>
          
          {/* Container Bubble Pesan */}
          <div id="chat-container" className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-blue-600'} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                  {msg.sender === 'user' ? 'M' : 'AI'}
                </div>
                <div className={`${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'} p-4 rounded-2xl max-w-2xl text-sm space-y-2 shadow-xs`}>
                  <p>{msg.text}</p>
                  {msg.source && (
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 space-y-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sumber Sitasi (RAG):</p>
                      <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs px-2.5 py-0.5 rounded-md font-medium">{msg.source}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Input & Tombol Kirim */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              required
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400"
              placeholder="Ketik pertanyaan materi kuliah Anda..." 
              aria-required="true"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm">
              Kirim
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-xs py-4 text-center text-slate-400" role="contentinfo">
        <p>&copy; 2026 D3 Teknik Informatika Kabupaten Madiun - Sekolah Vokasi UNS[cite: 2].</p>
      </footer>
    </div>
  );
}