'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

export function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const enabled = storage.getDarkMode();
    setDark(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    storage.setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-brand-700">CaixaSeguro Restaurante</Link>
        <button onClick={toggle} className="rounded-lg border px-3 py-1 text-sm">{dark ? '☀️ Claro' : '🌙 Escuro'}</button>
      </div>
    </header>
  );
}
