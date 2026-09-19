import React, { useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  topic: string;
  preview: string;
  course: string;
  categoryBg: string;
  date: string;
}

interface HistoryProps {
  onNavigate?: (page: string) => void;
}

export default function History({ onNavigate }: HistoryProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data riwayat awal (dapat dihubungkan dengan localStorage atau state global jika diperlukan)
  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    {
      id: '1',
      topic: 'Konsep Dasar Vector Database & Embedding',
      preview: '"Bagaimana cara sistem melakukan retrieval dokumen..."',
      course: 'Manajemen Proyek TI',
      categoryBg: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
      date: '19 September 2026, 10:15',
    },
    {
      id: '2',
      topic: 'Penerapan Semantic HTML5 & ARIA',
      preview: '"Apa itu HTML5 Semantik dan contoh tag-nya?"',
      course: 'Pemrograman Front-End',
      categoryBg: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
      date: '18 September 2026, 14:30',
    },
    {
      id: '3',
      topic: 'Implementasi OOP Python & Inheritance',
      preview: '"Jelaskan class Karyawan dan KaryawanTetap..."',
      course: 'Pemrograman Berorientasi Objek',
      categoryBg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
      date: '15 September 2026, 09:00',
    },
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

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus riwayat sesi ini?')) {
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Filter data berdasarkan input pencarian
  const filteredHistory = historyList.filter((item) =>
    item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300 w-full">

      {/* Navbar Atas */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">EM</div>
            <div>
              <span className="text-sm font-bold block leading-tight">EduMate AI</span>
              <span className="text-[11px] text-slate-400">Riwayat Percakapan (FR-08)</span>
            </div>
          </div>
          <nav aria-label="Navigasi Utama" className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Dashboard</button>
            <button onClick={() => onNavigate?.('chat')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Tanya Jawab AI</button>
            <button onClick={() => onNavigate?.('history')} className="text-white font-semibold cursor-pointer bg-transparent border-none" aria-current="page">Riwayat Sesi</button>
          </nav>
          <div className="flex items-center space-x-3">
            {/* Tombol Toggle Mode Gelap / Terang */}
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

      {/* Konten Utama Semantik */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-6" role="main">
        
        {/* Bagian Header Halaman & Pencarian */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Riwayat Percakapan Mahasiswa</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kelola dan tinjau kembali daftar pertanyaan serta jawaban RAG yang pernah Anda ajukan sebelumnya[cite: 2].</p>
          </div>
          <div className="w-full md:w-72">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik percakapan..." 
              className="w-full px-4 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Tabel Daftar Riwayat Sesi */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden" aria-labelledby="history-list-heading">
          <h2 id="history-list-heading" class="sr-only">Daftar Riwayat Sesi Tanya Jawab</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID & Topik Pertanyaan</th>
                  <th className="px-6 py-4 font-semibold">Mata Kuliah / Konteks</th>
                  <th className="px-6 py-4 font-semibold">Waktu Sesi</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">Tidak ada riwayat percakapan yang ditemukan.</td>
                  </tr>
                ) : (
                  filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 dark:text-white block">{item.topic}</span>
                        <span className="text-[11px] text-slate-400">{item.preview}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${item.categoryBg} px-2.5 py-1 rounded-md font-medium`}>{item.course}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => onNavigate?.('chat')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold bg-transparent border-none cursor-pointer">Buka Chat</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-medium bg-transparent border-none cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-xs py-6 text-center text-slate-400" role="contentinfo">
        <p>&copy; 2026 D3 Teknik Informatika Kabupaten Madiun - Sekolah Vokasi UNS[cite: 2].</p>
      </footer>
    </div>
  );
}