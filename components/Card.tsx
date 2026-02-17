import { ReactNode } from 'react';

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  );
}
