import React, { useState, useEffect } from 'react';

interface DashboardMahasiswaProps {
  onNavigate?: (page: string) => void;
}

export default function DashboardMahasiswa({ onNavigate }: DashboardMahasiswaProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300 w-full">

      {/* Navbar Profesional */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">EM</div>
            <div>
              <span className="text-sm font-bold block leading-tight">EduMate AI Companion</span>
              <span className="text-[11px] text-slate-400">Mahasiswa • D3 Teknik Informatika SV UNS</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard')} className="text-white font-semibold cursor-pointer bg-transparent border-none">Dashboard</button>
            <button onClick={() => onNavigate?.('chat')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Tanya Jawab AI</button>
            <button onClick={() => onNavigate?.('history')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Riwayat Sesi</button>
          </nav>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme} 
              aria-label="Ganti Tema" 
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
            <button onClick={() => onNavigate?.('auth')} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors cursor-pointer border-none">Keluar</button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8" role="main">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-2 relative z-10">
            <span className="bg-blue-500/30 text-blue-100 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">Sistem RAG Aktif</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Selamat Datang Kembali, Mahasiswa! 👋</h1>
            <p className="text-xs md:text-sm text-blue-100 max-w-xl leading-relaxed">Eksplorasi materi perkuliahan, RPS, dan modul praktikum secara instan dengan bantuan kecerdasan buatan.</p>
          </div>
          <div className="relative z-10 flex gap-3">
            <button onClick={() => onNavigate?.('chat')} className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer border-none">Mulai Tanya AI 🚀</button>
          </div>
        </div>

        {/* Statistik Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-blue-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Dokumen Sumber</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">24 Berkas</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">📁</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-emerald-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sesi Tanya Jawab AI</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">142 Sesi</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">💬</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-amber-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tingkat Kepuasan (Rating)</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4.8 / 5.0</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">⭐</div>
          </div>
        </section>

        {/* Aktivitas & Akses Cepat */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Dokumen Referensi Aktif Terbaru</h2>
              <button onClick={() => onNavigate?.('history')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none">Lihat Riwayat Sesi →</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-xs">RPS Pemrograman Web Modern v2.1</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kategori: RPS • Status Vector DB: Terindeks Sempurna</p>
                </div>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold px-3 py-1 rounded-full">Aktif</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-xs">Modul 1-2 Front-End Engineering</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Kategori: Modul Praktikum • Status Vector DB: Terindeks Sempurna</p>
                </div>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold px-3 py-1 rounded-full">Aktif</span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-slate-900 dark:bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <h2 className="text-sm font-bold">Mulai Percakapan Baru</h2>
              <p className="text-xs text-slate-400 leading-relaxed">Kirim pertanyaan akademik Anda dan dapatkan jawaban bersumber dari sitasi dokumen resmi.</p>
              <button onClick={() => onNavigate?.('chat')} className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors w-full shadow-md cursor-pointer border-none">Buka Ruang Chat AI →</button>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Arsip Riwayat Sesi</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Tinjau kembali tanya jawab sebelumnya untuk persiapan ujian atau tugas mandiri.</p>
              <button onClick={() => onNavigate?.('history')} className="inline-block text-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors w-full cursor-pointer border-none">Kelola Riwayat Chat →</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 text-xs py-6 text-center text-slate-400">
        <p>&copy; 2026 D3 Teknik Informatika Kabupaten Madiun - Sekolah Vokasi UNS.</p>
      </footer>
    </div>
  );
}