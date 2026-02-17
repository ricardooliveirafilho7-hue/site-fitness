import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[240px_1fr]">
        <Sidebar />
        <section className="space-y-4">{children}</section>
      </main>
    </div>
  );
}
