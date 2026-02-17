'use client';
import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { storage } from '@/lib/storage';

export default function SimuladorPage() {
  const setup = storage.getSetup();
  const [revPct, setRevPct] = useState(0);
  const [fixedCut, setFixedCut] = useState(0);
  const [marginAdjust, setMarginAdjust] = useState(0);
  const [weakCampaign, setWeakCampaign] = useState(0);

  if (!setup) return <AppShell><Card title="Sem setup">Configure primeiro no setup.</Card></AppShell>;

  const simulated = {
    ...setup,
    strongDayRevenue: setup.strongDayRevenue * (1 + revPct / 100),
    weakDayRevenue: setup.weakDayRevenue * (1 + weakCampaign / 100),
    fixedCosts: Math.max(0, setup.fixedCosts - fixedCut),
    desiredProfitPercent: Math.max(0, setup.desiredProfitPercent + marginAdjust)
  };

  return (
    <AppShell>
      <Card title="Simulador de Cenários">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">Aumento receita (%)<Input type="number" value={revPct} onChange={(e) => setRevPct(Number(e.target.value))} /></label>
          <label className="text-sm">Redução custo fixo (R$)<Input type="number" value={fixedCut} onChange={(e) => setFixedCut(Number(e.target.value))} /></label>
          <label className="text-sm">Ajuste de margem desejada (%)<Input type="number" value={marginAdjust} onChange={(e) => setMarginAdjust(Number(e.target.value))} /></label>
          <label className="text-sm">Campanha dia fraco (%)<Input type="number" value={weakCampaign} onChange={(e) => setWeakCampaign(Number(e.target.value))} /></label>
        </div>
        <pre className="mt-3 overflow-auto rounded bg-slate-100 p-3 text-xs dark:bg-slate-700">{JSON.stringify(simulated, null, 2)}</pre>
        <Button className="mt-3" onClick={() => storage.setSetup(simulated)}>Aplicar mudanças permanentemente</Button>
      </Card>
    </AppShell>
  );
}
