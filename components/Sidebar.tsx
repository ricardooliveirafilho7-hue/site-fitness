import Link from 'next/link';

const links = [
  ['/app/dashboard', 'Dashboard'],
  ['/app/setup', 'Setup'],
  ['/app/simulador', 'Simulador'],
  ['/app/evolucao', 'Evolução'],
  ['/app/ias', 'IA'],
  ['/app/config', 'Config']
];

export function Sidebar() {
  return (
    <aside className="w-full rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 md:w-60">
      <nav className="flex flex-wrap gap-2 md:flex-col">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">{label}</Link>
        ))}
      </nav>
    </aside>
  );
}
