import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';

const pages = [
  ['previsao-caixa', 'Previsão de Caixa'],
  ['meta-diaria', 'Meta Diária'],
  ['alerta-risco', 'Alerta de Risco'],
  ['precificacao-prato', 'Precificação de Prato'],
  ['simulador-promocao', 'Simulador de Promoção'],
  ['plano-semanal', 'Plano Semanal']
];

export default function IASPage() {
  return (
    <AppShell>
      <Card title="Ferramentas de IA">
        <div className="grid gap-3 md:grid-cols-2">
          {pages.map(([slug, title]) => (
            <Link key={slug} href={`/app/ias/${slug}`} className="rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-700">{title}</Link>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
