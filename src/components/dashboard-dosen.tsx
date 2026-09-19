import React, { useState, useEffect } from 'react';

interface DosenDocument {
  id?: string;
  title: string;
  type: string;
  course: string;
  date: string;
  email: string;
}

interface DashboardDosenProps {
  onNavigate?: (page: string) => void;
}

const DOSEN_EMAIL = "budi@dosen.uns.ac.id";

export default function DashboardDosen({ onNavigate }: DashboardDosenProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myRecords, setMyRecords] = useState<DosenDocument[]>([]);

  useEffect(() => {
    // Tema gelap/terang
    const isDark = document.documentElement.classList.contains('dark') ||
      (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    // Muat data dokumen dari localStorage
    try {
      const records: DosenDocument[] = JSON.parse(localStorage.getItem('edumate_uploads') || '[]');
      const filtered = records.filter(r => r.email === DOSEN_EMAIL);
      setMyRecords(filtered);
    } catch (e) {
      console.error("Gagal memuat data dokumen:", e);
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

      {/* Navbar Dosen */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">DS</div>
            <div>
              <span className="text-sm font-bold block leading-tight">Dashboard Dosen</span>
              <span className="text-[11px] text-slate-400">Dr. Budi Santoso ({DOSEN_EMAIL})</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard-dosen')} className="text-white font-semibold cursor-pointer bg-transparent border-none">Beranda Dosen</button>
            <button onClick={() => onNavigate?.('upload-dosen')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Unggah Dokumen Baru</button>
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
        
        {/* Banner Portal Dosen */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="bg-blue-600/30 text-blue-300 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/30">Portal Pengajar & Validator</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Manajemen Basis Pengetahuan Dosen</h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">Unggah dan pantau materi RPS, modul, serta jurnal referensi untuk memastikan akurasi jawaban AI bagi mahasiswa.</p>
          </div>
          <div>
            <button onClick={() => onNavigate?.('upload-dosen')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2 cursor-pointer border-none">
              <span>+ Unggah Dokumen Baru</span>
            </button>
          </div>
        </div>

        {/* Statistik Dosen */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-blue-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dokumen Anda Terindeks</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{myRecords.length} Berkas</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">📚</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-emerald-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status Pipeline RAG</p>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Aktif & Normal</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">⚡</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex justify-between items-center transition-all hover:border-purple-500/50">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hak Akses Sistem</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">Dosen Pengampu</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">🛡️</div>
          </div>
        </section>

        {/* Daftar Dokumen Dosen */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Daftar Dokumen Anda di Vector DB</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Riwayat berkas yang berhasil diunggah dan siap digunakan sebagai konteks RAG.</p>
            </div>
            <button onClick={() => onNavigate?.('upload-dosen')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none">+ Unggah Berkas Baru</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">Judul Dokumen</th>
                  <th className="px-4 py-3 font-semibold">Jenis</th>
                  <th className="px-4 py-3 font-semibold">Mata Kuliah</th>
                  <th className="px-4 py-3 font-semibold">Waktu Upload</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {myRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">Belum ada dokumen yang diunggah.</td>
                  </tr>
                ) : (
                  myRecords.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-white">{item.title}</td>
                      <td className="px-4 py-3.5"><span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md text-[11px] font-medium">{item.type}</span></td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 font-medium">{item.course}</td>
                      <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-4 py-3.5"><span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Terindeks</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 text-xs py-6 text-center text-slate-400">
        <p>&copy; 2026 D3 Teknik Informatika Kabupaten Madiun - Sekolah Vokasi UNS[cite: 2].</p>
      </footer>
    </div>
  );
}