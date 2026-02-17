'use client';
import { useMemo, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';
import { ChartCard } from '@/components/ChartCard';
import { Button } from '@/components/Button';
import { RiskBadge } from '@/components/RiskBadge';
import { storage } from '@/lib/storage';
import { calculateBreakEven, calculateDailyTargets, calculateProfit, calculateRiskLevel } from '@/lib/financialEngine';
import { generateAIResponse } from '@/lib/openai';

const money = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);

export default function DashboardPage() {
  const setup = storage.getSetup();
  const [aiText, setAiText] = useState('');
  const [loading, setLoading] = useState(false);

  const projection = useMemo(() => (setup ? calculateProfit(setup) : null), [setup]);
  const breakEven = useMemo(() => (setup ? calculateBreakEven(setup) : 0), [setup]);
  const targets = useMemo(() => (setup ? calculateDailyTargets(setup) : { dailyTarget: 0, remainingDailyTarget: 0 }), [setup]);
  const risk = useMemo(() => (setup ? calculateRiskLevel(setup) : 'red'), [setup]);

  if (!setup || !projection) {
    return <AppShell><Card title="Sem dados"><p>Faça o setup inicial para visualizar o dashboard.</p></Card></AppShell>;
  }

  const lineData = Array.from({ length: 4 }, (_, i) => ({ semana: `S${i + 1}`, receita: projection.monthlyRevenue * ((i + 1) / 4) }));
  const barData = [
    { name: 'Sem 1', valor: projection.monthlyRevenue * 0.23 },
    { name: 'Sem 2', valor: projection.monthlyRevenue * 0.24 },
    { name: 'Sem 3', valor: projection.monthlyRevenue * 0.26 },
    { name: 'Sem 4', valor: projection.monthlyRevenue * 0.27 }
  ];

  const recommendations = [
    projection.profit < 0 ? 'Revisar custo variável e renegociar fornecedores imediatamente.' : 'Manter estratégia atual e reforçar dia fraco.',
    targets.remainingDailyTarget > setup.strongDayRevenue ? 'Meta diária restante está alta: ativar campanhas locais.' : 'Meta diária restante está controlada.',
    risk === 'red' ? 'Corte custos fixos não essenciais esta semana.' : 'Monitore ticket médio diariamente.'
  ];

  return (
    <AppShell>
      <div className="grid gap-3 md:grid-cols-3">
        <Card title="Receita prevista">{money(projection.monthlyRevenue)}</Card>
        <Card title="Lucro previsto">{money(projection.profit)}</Card>
        <Card title="Break-even">{money(breakEven)}</Card>
        <Card title="Meta diária">{money(targets.dailyTarget)}</Card>
        <Card title="Meta diária restante">{money(targets.remainingDailyTarget)}</Card>
        <Card title="Risco"><RiskBadge risk={risk} /></Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartCard title="Projeção Mensal">
          <ResponsiveContainer width="100%" height="100%"><LineChart data={lineData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="semana"/><YAxis/><Tooltip/><Line type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={2}/></LineChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Projeção Semanal">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={barData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="valor" fill="#047857" /></BarChart></ResponsiveContainer>
        </ChartCard>
      </div>

      <Card title="Recomendações determinísticas">
        <ul className="list-disc space-y-1 pl-5 text-sm">{recommendations.map((r) => <li key={r}>{r}</li>)}</ul>
        <div className="mt-3 flex gap-2">
          <Button disabled={loading} onClick={async () => {
            setLoading(true);
            const res = await generateAIResponse('plano-dashboard', { setup, projection, breakEven, targets, risk });
            setAiText(res.text);
            setLoading(false);
          }}>{loading ? 'Gerando...' : 'Generate AI Plan'}</Button>
          <Button className="bg-slate-700 hover:bg-slate-800" onClick={() => storage.saveSnapshot({ id: crypto.randomUUID(), month: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }), revenue: projection.monthlyRevenue, costs: projection.totalCosts, profit: projection.profit })}>Salvar snapshot</Button>
        </div>
        {aiText && <p className="mt-3 rounded bg-slate-100 p-3 text-sm dark:bg-slate-700">{aiText}</p>}
      </Card>
    </AppShell>
  );
}
