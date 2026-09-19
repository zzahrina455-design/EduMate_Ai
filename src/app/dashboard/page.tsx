import { useEffect } from 'react';

export default function DashboardHub() {
  // Contoh logika pengecekan role dari localStorage / state auth
  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    if (userEmail.includes('@student')) {
      window.location.href = '/dashboard/mahasiswa';
    } else if (userEmail.includes('@dosen')) {
      window.location.href = '/dashboard/dosen';
    } else {
      window.location.href = '/dashboard/admin';
    }
  }, [userEmail]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Mengarahkan ke dashboard sesuai hak akses...</p>
    </div>
  );
}