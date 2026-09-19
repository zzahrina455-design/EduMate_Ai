import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Auth from './Auth';

describe('Komponen Autentikasi (Auth)', () => {
  it('dirender dengan tab Masuk sebagai default', () => {
    render(<Auth />);
    expect(screen.getByText(/Masuk ke Sistem/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/nama@student.uns.ac.id/i)).toBeDefined();
  });

  it('dapat beralih ke tab Daftar Akun saat tombol diklik', () => {
    render(<Auth />);
    const registerTabButton = screen.getByRole('button', { name: /Daftar Akun/i });
    fireEvent.click(registerTabButton);
    
    expect(screen.getByText(/Daftarkan Akun/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Contoh: Dr. Budi, M.Kom./i)).toBeDefined();
  });

  it('memicu navigasi saat login dengan email mahasiswa', () => {
    const handleNavigate = vi.fn();
    render(<Auth onNavigate={handleNavigate} />);

    const emailInput = screen.getByPlaceholderText(/nama@student.uns.ac.id/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole('button', { name: /Masuk ke Sistem/i });

    fireEvent.change(emailInput, { target: { value: 'mahasiswa@student.uns.ac.id' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(handleNavigate).toHaveBeenCalledWith('dashboard');
  });
});