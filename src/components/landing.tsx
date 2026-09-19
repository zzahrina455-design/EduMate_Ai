import React, { useState, useEffect } from 'react';

interface LandingProps {
  onNavigate?: (page: string) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Periksa preferensi tema saat komponen dimuat
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
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Navbar Atas */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-extrabold text-base shadow-sm">EM</div>
            <div>
              <span className="text-base font-bold tracking-tight block leading-tight">EduMate AI</span>
              <span className="text-[11px] text-slate-400 font-medium block">AI Learning Companion RAG - SV UNS</span>
            </div>
          </div>
          <nav aria-label="Navigasi Utama" className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#fitur" className="hover:text-white transition-colors">Fitur Unggulan</a>
            <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja RAG</a>
            <a href="#keunggulan" className="hover:text-white transition-colors">Keunggulan</a>
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
            <button onClick={() => onNavigate?.('auth')} className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 cursor-pointer">Masuk</button>
            <button onClick={() => onNavigate?.('auth')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer">Daftar Sekarang</button>
          </div>
        </div>
      </header>

      {/* Konten Utama Semantik */}
      <main className="flex-1" role="main">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="hero-heading">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Vector DB Active & Integrated</span>
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Asisten Pembelajaran Cerdas Berbasis RAG & Dokumen Resmi
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Solusi AI terintegrasi untuk mahasiswa D3 Teknik Informatika SV UNS. Dapatkan jawaban instan dan terverifikasi yang diambil langsung dari RPS, Modul Praktikum, dan Jurnal Dosen.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => onNavigate?.('chat')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center space-x-2 text-sm cursor-pointer">
                <span>Mulai Percakapan AI</span>
                <span>🚀</span>
              </button>
              <button onClick={() => onNavigate?.('dashboard')} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 font-medium px-6 py-3.5 rounded-xl transition-all text-sm cursor-pointer">
                Buka Dashboard
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-5 space-y-4 relative">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">edumate.uns.ac.id</span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">AI</div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3.5 rounded-2xl rounded-tl-none text-xs leading-relaxed">
                  Halo! Ada yang bisa saya bantu terkait modul perkuliahan hari ini?
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[80%]">
                  Apa itu HTML5 Semantik dan contoh tag-nya?
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">M</div>
              </div>

              <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-blue-700 dark:text-blue-400">RPS Verified</span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Match: 95%</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Modul 1 Praktikum Web Modern</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">"Tag semantik memberikan makna struktural seperti header, nav, main, dan footer..."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur Unggulan Section */}
        <section id="fitur" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-900" aria-labelledby="fitur-heading">
          <div className="text-center mb-16 space-y-3">
            <h2 id="fitur-heading" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Fitur Unggulan Sistem</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Dirancang khusus untuk membantu mahasiswa mengeksplorasi materi kuliah secara efektif dan terstruktur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-xl">⚡</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pencarian Semantik Cepat</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Menemukan topik spesifik dari berbagai tumpukan dokumen perkuliahan dalam hitungan detik tanpa pencarian manual satu per satu.</p>
            </article>
            <article className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl">🛡️</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Integritas Akademik & Etika AI</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">AI diarahkan untuk mendukung proses berpikir kritis mahasiswa, bukan sekadar memberikan jawaban instan tanpa dasar.</p>
            </article>
            <article className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center font-bold text-xl">📊</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Riwayat Sesi Terpusat</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Simpan dan akses kembali seluruh percakapan serta riwayat pertanyaan sebelumnya untuk keperluan evaluasi belajar.</p>
            </article>
          </div>
        </section>

        {/* Cara Kerja RAG Section */}
        <section id="cara-kerja" className="py-20 px-6 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-900" aria-labelledby="rag-heading">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <h2 id="rag-heading" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Bagaimana Cara Kerja RAG?</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Retrieval-Augmented Generation memastikan jawaban AI selalu berpijak pada dokumen resmi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 relative">
                <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">1</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">Pengunggahan Dokumen</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Dosen mengunggah file RPS, modul, jurnal, atau buku ke dalam sistem yang secara otomatis diekstrak dan diubah menjadi *vector embedding*.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 relative">
                <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">2</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">Pencarian Vektor (Retrieval)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Saat mahasiswa bertanya, sistem mencari potongan teks dokumen yang memiliki kemiripan semantik tertinggi di dalam Vector Database.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 relative">
                <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">3</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-2">Generasi Jawaban & Sitasi</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">LLM merumuskan jawaban berdasarkan konteks dokumen tersebut dan menampilkan sumber referensi asli yang dapat diverifikasi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan Section */}
        <section id="keunggulan" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-900" aria-labelledby="keunggulan-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 id="keunggulan-heading" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Mengapa EduMate AI Menjadi Solusi Unggul di Perguruan Tinggi?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Mengatasi kendala pencarian manual yang memakan waktu lama. Sistem memusatkan seluruh referensi belajar ke dalam satu platform cerdas yang aman, cepat, dan responsif.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center space-x-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Mengurangi risiko misinformasi dan halusinasi AI berkat sistem RAG.</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Kompatibel di berbagai perangkat (Komputer, Laptop, hingga Smartphone).</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Keamanan terjamin dengan kontrol hak akses berbasis peran (RBAC).</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-600 dark:bg-blue-900/40 p-8 rounded-2xl text-white space-y-6 shadow-xl">
              <h3 className="text-xl font-bold">Mulai Transformasi Belajar Anda Hari Ini</h3>
              <p className="text-xs text-blue-100 leading-relaxed">Bergabunglah dengan sivitas akademika D3 Teknik Informatika SV UNS untuk memanfaatkan asisten cerdas berbasis teknologi terkini.</p>
              <button onClick={() => onNavigate?.('auth')} className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm cursor-pointer">Daftar Akun Sekarang</button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Profesional */}
      <footer className="bg-slate-950 border-t border-slate-800 text-xs py-10 text-slate-400" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-xs">EM</div>
              <span>EduMate AI</span>
            </div>
            <p className="text-[11px] text-slate-400">AI Learning Companion berbasis RAG untuk mendukung transformasi pendidikan tinggi.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#fitur" className="hover:text-white transition-colors">Fitur Unggulan</a></li>
              <li><a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja RAG</a></li>
              <li><a href="#keunggulan" className="hover:text-white transition-colors">Keunggulan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Halaman Aplikasi</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onNavigate?.('dashboard')} className="hover:text-white transition-colors cursor-pointer text-left">Dashboard Utama</button></li>
              <li><button onClick={() => onNavigate?.('chat')} className="hover:text-white transition-colors cursor-pointer text-left">Tanya Jawab AI</button></li>
              <li><button onClick={() => onNavigate?.('auth')} className="hover:text-white transition-colors cursor-pointer text-left">Masuk / Daftar</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Institusi</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Program Studi D3 Teknik Informatika<br />
              Sekolah Vokasi Universitas Sebelas Maret
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-900 text-center text-[11px]">
          <p>&copy; 2026 D3 Teknik Informatika Kabupaten Madiun - Sekolah Vokasi UNS. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}