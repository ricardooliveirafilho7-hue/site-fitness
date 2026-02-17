'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { storage } from '@/lib/storage';

export default function EvolucaoPage() {
  const snapshots = storage.getSnapshots();

  return (
    <AppShell>
      <Card title="Evolução Mensal">
        {snapshots.length === 0 ? <p className="text-sm">Nenhum snapshot salvo.</p> : (
          <div className="space-y-2">
            {snapshots.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded border p-2 text-sm">
                <span>{s.month}: Lucro {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(s.profit)}</span>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => storage.deleteSnapshot(s.id)}>Excluir</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card title="Comparativo">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={snapshots}><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="profit" fill="#10b981" /></BarChart></ResponsiveContainer>
        </div>
      </Card>
    </AppShell>
  );
}
