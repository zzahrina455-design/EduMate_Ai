import React, { useState } from 'react';

interface AuthProps {
  onNavigate?: (page: string) => void;
  defaultTab?: 'login' | 'register'; // Menerima pilihan tab awal dari halaman luar
}

export default function Auth({ onNavigate, defaultTab = 'login' }: AuthProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  
  // State Form Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State Form Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = loginEmail.toLowerCase();

    if (emailLower.includes('@dosen.uns.ac.id')) {
      alert("Login Berhasil sebagai DOSEN. Mengalihkan ke Portal Dosen...");
      onNavigate?.('dashboard-dosen');
    } else if (emailLower.includes('@tendik.uns.ac.id') || emailLower.includes('@admin.uns.ac.id')) {
      alert("Login Berhasil sebagai TENDIK/ADMIN. Mengalihkan ke Panel Kurasi...");
      onNavigate?.('dashboard-tendik');
    } else {
      alert("Login Berhasil sebagai MAHASISWA. Mengalihkan ke Dashboard...");
      onNavigate?.('dashboard');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registrasi Berhasil! Silakan masuk menggunakan akun yang telah didaftarkan.");
    
    // Reset form pendaftaran
    setRegName('');
    setRegEmail('');
    setRegPassword('');

    // Alihkan otomatis kembali ke tab Login di dalam komponen yang sama
    setActiveTab('login');
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex items-center justify-center p-4 transition-colors duration-300 w-full">
      <main className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6" role="main">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl mx-auto flex items-center justify-center font-bold text-xl shadow-md">EM</div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">EduMate AI Portal</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Masuk sesuai peran sivitas akademika UNS.</p>
        </div>

        {/* Tombol Switch Tab (Login / Register) */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-medium">
          <button 
            type="button"
            onClick={() => setActiveTab('login')} 
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'login' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Masuk
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('register')} 
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'register' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Daftar Akun
          </button>
        </div>

        {/* Form Login dengan Deteksi Email Peran */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="nama@student.uns.ac.id / @dosen.uns.ac.id"
              />
              <p className="text-[10px] text-slate-400 mt-1">Sistem otomatis mendeteksi akses (Mahasiswa/Dosen/Tendik).</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-md cursor-pointer">
              Masuk ke Sistem
            </button>
          </form>
        )}

        {/* Form Register */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                required 
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="Contoh: Dr. Budi, M.Kom."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="budi@dosen.uns.ac.id"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-sm bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors shadow-md cursor-pointer">
              Daftarkan Akun
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          <button 
            type="button" 
            onClick={() => onNavigate?.('landing')} 
            className="hover:underline text-blue-600 dark:text-blue-400 cursor-pointer bg-transparent border-none"
          >
            ← Kembali ke Beranda Utama
          </button>
        </div>
      </main>
    </div>
  );
}