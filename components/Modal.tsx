import { ReactNode } from 'react';

export function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-lg rounded-xl bg-white p-4 dark:bg-slate-800">{children}</div></div>;
}
