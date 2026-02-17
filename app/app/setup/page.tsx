'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';
import { CurrencyInput } from '@/components/CurrencyInput';
import { PercentageInput } from '@/components/PercentageInput';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { storage } from '@/lib/storage';
import { SetupData } from '@/lib/financialEngine';

const initial: SetupData = {
  averageTicket: 0,
  strongDayRevenue: 0,
  weakDayRevenue: 0,
  strongDaysPerWeek: 3,
  weakDaysPerWeek: 3,
  fixedCosts: 0,
  variableCostPercent: 35,
  extraMonthlyCosts: 0,
  desiredProfitPercent: 15,
  openDaysPerWeek: 6
};

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SetupData>(() => storage.getSetup() ?? initial);
  const [error, setError] = useState('');

  const invalid = useMemo(() => data.strongDayRevenue <= data.weakDayRevenue, [data]);

  const next = () => {
    if (step === 1 && (data.averageTicket <= 0 || invalid)) {
      setError('Preencha ticket médio e garanta que dia forte seja maior que dia fraco.');
      return;
    }
    if (step === 2 && (data.fixedCosts <= 0 || data.variableCostPercent < 0 || data.variableCostPercent > 100)) {
      setError('Custos inválidos.');
      return;
    }
    setError('');
    setStep((s) => Math.min(3, s + 1));
  };

  const finish = () => {
    storage.setSetup(data);
    router.push('/app/dashboard');
  };

  return (
    <AppShell>
      <Card title={`Setup Inicial - Etapa ${step}/3`}>
        {step === 1 && (
          <div className="space-y-3">
            <label className="text-sm">Ticket médio</label>
            <CurrencyInput value={data.averageTicket} onValueChange={(v) => setData({ ...data, averageTicket: v })} />
            <label className="text-sm">Receita dia forte</label>
            <CurrencyInput value={data.strongDayRevenue} onValueChange={(v) => setData({ ...data, strongDayRevenue: v })} />
            <label className="text-sm">Receita dia fraco</label>
            <CurrencyInput value={data.weakDayRevenue} onValueChange={(v) => setData({ ...data, weakDayRevenue: v })} />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <label className="text-sm">Custos fixos mensais</label>
            <CurrencyInput value={data.fixedCosts} onValueChange={(v) => setData({ ...data, fixedCosts: v })} />
            <label className="text-sm">Custos extras</label>
            <CurrencyInput value={data.extraMonthlyCosts} onValueChange={(v) => setData({ ...data, extraMonthlyCosts: v })} />
            <label className="text-sm">Custo variável %</label>
            <PercentageInput value={data.variableCostPercent} onValueChange={(v) => setData({ ...data, variableCostPercent: v })} />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <label className="text-sm">Dias fortes por semana</label>
            <Input type="number" value={data.strongDaysPerWeek} onChange={(e) => setData({ ...data, strongDaysPerWeek: Number(e.target.value) })} />
            <label className="text-sm">Dias fracos por semana</label>
            <Input type="number" value={data.weakDaysPerWeek} onChange={(e) => setData({ ...data, weakDaysPerWeek: Number(e.target.value) })} />
            <label className="text-sm">Dias abertos por semana</label>
            <Input type="number" value={data.openDaysPerWeek} onChange={(e) => setData({ ...data, openDaysPerWeek: Number(e.target.value) })} />
            <label className="text-sm">Lucro desejado %</label>
            <PercentageInput value={data.desiredProfitPercent} onValueChange={(v) => setData({ ...data, desiredProfitPercent: v })} />
          </div>
        )}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-4 flex gap-2">
          {step > 1 && <Button className="bg-slate-700 hover:bg-slate-800" onClick={() => setStep(step - 1)}>Voltar</Button>}
          {step < 3 ? <Button onClick={next}>Próximo</Button> : <Button onClick={finish}>Finalizar</Button>}
        </div>
      </Card>
    </AppShell>
  );
}
