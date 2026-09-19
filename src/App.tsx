import React, { useState } from 'react';
import Landing from './components/landing';
import Auth from './components/auth';
import DashboardMahasiswa from './components/dashboard';
import DashboardDosen from './components/dashboard-dosen';
import DashboardTendik from './components/dashboard-tendik';
import ChatAI from './components/chat';
import History from './components/history';
import ManajemenTendik from './components/manajemen-tendik';
import UploadDosen from './components/upload-dosen'; // 1. Impor komponen UploadDosen

export type PageType = 
  | 'landing' 
  | 'auth' 
  | 'dashboard' 
  | 'dashboard-dosen' 
  | 'dashboard-tendik' 
  | 'chat'
  | 'upload-dosen'
  | 'manajemen-tendik'
  | 'history';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  switch (currentPage) {
    case 'landing':
      return <Landing onNavigate={handleNavigate} />;
    
    case 'auth':
      return <Auth onNavigate={handleNavigate} />;
    
    case 'dashboard':
      return <DashboardMahasiswa onNavigate={handleNavigate} />;
    
    case 'dashboard-dosen':
      return <DashboardDosen onNavigate={handleNavigate} />;
    
    case 'upload-dosen': // 2. Tambahkan case untuk halaman unggah dosen
      return <UploadDosen onNavigate={handleNavigate} />;
    
    case 'dashboard-tendik':
      return <DashboardTendik onNavigate={handleNavigate} />;

    case 'manajemen-tendik':
      return <ManajemenTendik onNavigate={handleNavigate} />;
    
    case 'chat':
      return <ChatAI onNavigate={handleNavigate} />;

    case 'history':
      return <History onNavigate={handleNavigate} />;
    
    default:
      return <Landing onNavigate={handleNavigate} />;
  }
}