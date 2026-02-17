import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navbar } from '@/components/Navbar';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">CaixaSeguro Restaurante</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Preveja lucro ou prejuízo do mês e tome decisões com IA.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/app/setup"><Button>Começar Setup</Button></Link>
          <Link href="/app/dashboard"><Button className="bg-slate-700 hover:bg-slate-800">Ir ao Dashboard</Button></Link>
        </div>
      </main>
    </div>
  );
}
