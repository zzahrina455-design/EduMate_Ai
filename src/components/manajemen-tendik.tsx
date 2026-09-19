import React, { useState, useEffect } from 'react';

interface UploadRecord {
  id: number;
  dosenName: string;
  email: string;
  title: string;
  type: string;
  fileName: string;
  course: string;
  date: string;
}

interface ManajemenTendikProps {
  onNavigate?: (page: string) => void;
}

export default function ManajemenTendik({ onNavigate }: ManajemenTendikProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [records, setRecords] = useState<UploadRecord[]>([]);

  useEffect(() => {
    // Inisialisasi tema
    const isDark = document.documentElement.classList.contains('dark') ||
      (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    // Muat data dari localStorage
    loadTendikData();
  }, []);

  const loadTendikData = () => {
    try {
      const stored: UploadRecord[] = JSON.parse(localStorage.getItem('edumate_uploads') || '[]');
      setRecords(stored);
    } catch (e) {
      console.error("Gagal memuat data dokumen:", e);
    }
  };

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

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus referensi ini karena sudah tidak relevan?")) {
      try {
        const updated = records.filter((r) => r.id !== id);
        localStorage.setItem('edumate_uploads', JSON.stringify(updated));
        setRecords(updated);
        alert("Dokumen berhasil dihapus dari sistem.");
      } catch (e) {
        console.error("Gagal menghapus dokumen:", e);
      }
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300 w-full">

      {/* Navbar Tendik */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">TK</div>
            <div>
              <span className="text-sm font-bold block leading-tight">Panel Tendik - Kurasi Basis Pengetahuan</span>
              <span className="text-[11px] text-slate-400">Monitoring & Kurasi Dokumen RAG (FR-09)[cite: 2]</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard-tendik')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Dashboard Tendik</button>
            <button onClick={() => onNavigate?.('manajemen-tendik')} className="text-white font-semibold cursor-pointer bg-transparent border-none" aria-current="page">Kelola & Kurasi Dokumen</button>
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

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-6" role="main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Kelola & Kurasi Sumber Referensi</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pantau bukti unggahan dosen, perbarui informasi, atau hapus referensi yang sudah tidak relevan[cite: 2].</p>
          </div>
          <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            Total Berkas: {records.length}
          </span>
        </div>

        {/* Tabel Daftar Dokumen & Aksi CRUD */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden" aria-labelledby="tendik-list">
          <h2 id="tendik-list" className="sr-only">Tabel Bukti Unggahan Dosen</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Identitas Dosen (Nama & Akun)</th>
                  <th className="px-6 py-4 font-semibold">Judul & Jenis Dokumen</th>
                  <th className="px-6 py-4 font-semibold">Mata Kuliah</th>
                  <th className="px-6 py-4 font-semibold">Waktu Upload</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi Kurasi (CRUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">Belum ada dokumen yang diunggah oleh dosen manapun.</td>
                  </tr>
                ) : (
                  records.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 dark:text-white block">{item.dosenName}</span>
                        <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{item.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900 dark:text-white block">{item.title}</span>
                        <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded">{item.type}</span>
                        <span className="text-[11px] text-slate-400 block mt-1">📁 {item.fileName}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{item.course}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="text-red-600 hover:underline font-semibold cursor-pointer bg-transparent border-none"
                        >
                          Hapus / Nonaktifkan
                        </button>
                      </td>
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