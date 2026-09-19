import React, { useState, useEffect } from 'react';

interface UploadRecord {
  id: number;
  title: string;
  type: string;
  course: string;
  fileName: string;
  dosenName: string;
  email: string;
  date: string;
}

interface UploadDosenProps {
  onNavigate?: (page: string) => void;
}

const DOSEN_INFO = {
  name: "Dr. Budi Santoso, M.Kom.",
  email: "budi@dosen.uns.ac.id"
};

export default function UploadDosen({ onNavigate }: UploadDosenProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [myRecords, setMyRecords] = useState<UploadRecord[]>([]);

  // State Form
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('RPS (Rencana Pembelajaran Semester)');
  const [docCourse, setDocCourse] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Inisialisasi tema
    const isDark = document.documentElement.classList.contains('dark') ||
      (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    loadDosenHistory();
  }, []);

  const loadDosenHistory = () => {
    try {
      const records: UploadRecord[] = JSON.parse(localStorage.getItem('edumate_uploads') || '[]');
      const filtered = records.filter(r => r.email === DOSEN_INFO.email);
      setMyRecords(filtered);
    } catch (e) {
      console.error("Gagal memuat riwayat upload:", e);
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

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docCourse.trim()) return;

    const fileName = selectedFile ? selectedFile.name : 'dokumen.pdf';

    const newRecord: UploadRecord = {
      id: Date.now(),
      title: docTitle.trim(),
      type: docType,
      course: docCourse.trim(),
      fileName: fileName,
      dosenName: DOSEN_INFO.name,
      email: DOSEN_INFO.email,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };

    try {
      const records: UploadRecord[] = JSON.parse(localStorage.getItem('edumate_uploads') || '[]');
      records.unshift(newRecord);
      localStorage.setItem('edumate_uploads', JSON.stringify(records));

      alert("Dokumen berhasil diunggah dan di-index ke Vector Database!");
      
      // Reset form
      setDocTitle('');
      setDocCourse('');
      setSelectedFile(null);
      loadDosenHistory();
    } catch (err) {
      console.error("Gagal menyimpan dokumen:", err);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col transition-colors duration-300 w-full">

      {/* Navbar Dosen */}
      <header className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">DS</div>
            <div>
              <span className="text-sm font-bold block leading-tight">Portal Dosen - EduMate AI</span>
              <span className="text-[11px] text-slate-400">{DOSEN_INFO.name} ({DOSEN_INFO.email})</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate?.('dashboard-dosen')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-300">Dashboard Dosen</button>
            <button onClick={() => onNavigate?.('upload-dosen')} className="text-white font-semibold cursor-pointer bg-transparent border-none" aria-current="page">Unggah Dokumen</button>
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

      {/* Konten Utama Upload */}
      <main className="max-w-5xl mx-auto px-6 py-10 flex-1 w-full space-y-10" role="main">
        
        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Unggah Sumber Pembelajaran Baru</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Dokumen yang diunggah akan diekstrak teksnya dan dikonversi menjadi Vector Embeddings untuk basis pengetahuan RAG.</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Judul Dokumen <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required 
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="Misal: Modul 1 SDLC Waterfall 2026"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Jenis Dokumen</label>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="RPS (Rencana Pembelajaran Semester)" className="dark:bg-slate-900">RPS (Rencana Pembelajaran Semester)</option>
                  <option value="Modul Praktikum" className="dark:bg-slate-900">Modul Praktikum</option>
                  <option value="Jurnal & Referensi" className="dark:bg-slate-900">Jurnal & Referensi Dosen</option>
                  <option value="Buku Ajar" className="dark:bg-slate-900">Buku Ajar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mata Kuliah</label>
                <input 
                  type="text" 
                  required 
                  value={docCourse}
                  onChange={(e) => setDocCourse(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  placeholder="Misal: Manpro TI / Praktikum Web"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Pilih Berkas File (PDF/DOCX)</label>
              <input 
                type="file" 
                accept=".pdf,.docx" 
                required 
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-blue-950 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer border border-slate-300 dark:border-slate-700 rounded-xl p-1"
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 cursor-pointer border-none">
              <span>Mulai Indexing ke Vector Database ⚡</span>
            </button>
          </form>
        </div>

        {/* Riwayat Upload Dosen */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Dokumen yang Telah Di-Index dalam Vector DB</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Daftar riwayat dokumen pembelajaran yang telah Anda unggah.</p>
            </div>
            <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
              {myRecords.length} Berkas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Judul Dokumen</th>
                  <th className="px-4 py-3 font-semibold">Jenis</th>
                  <th className="px-4 py-3 font-semibold">Mata Kuliah</th>
                  <th className="px-4 py-3 font-semibold">Waktu Upload</th>
                  <th className="px-4 py-3 font-semibold">Status Vector DB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {myRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-slate-400 italic">Belum ada dokumen yang diunggah.</td>
                  </tr>
                ) : (
                  myRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{item.title}</td>
                      <td className="px-4 py-3"><span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md">{item.type}</span></td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.course}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{item.date}</td>
                      <td className="px-4 py-3"><span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Selesai Indexing</span></td>
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