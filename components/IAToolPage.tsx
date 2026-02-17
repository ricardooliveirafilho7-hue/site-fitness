'use client';
import { useMemo, useState } from 'react';
import { AppShell } from './AppShell';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';
import { Toast } from './Toast';
import { generateAIResponse } from '@/lib/openai';
import { storage } from '@/lib/storage';

export function IAToolPage({ pageKey, title }: { pageKey: string; title: string }) {
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const saved = useMemo(() => storage.getIAResults(pageKey), [pageKey, toast]);

  const calc = `Resultado base: ${v1 + v2}`;

  return (
    <AppShell>
      <Card title={title}>
        <div className="grid gap-3 md:grid-cols-2">
          <Input type="number" value={v1} onChange={(e) => setV1(Number(e.target.value))} placeholder="Valor 1" />
          <Input type="number" value={v2} onChange={(e) => setV2(Number(e.target.value))} placeholder="Valor 2" />
        </div>
        <p className="mt-3 text-sm">{calc}</p>
        {result && <p className="mt-2 rounded bg-slate-100 p-3 text-sm dark:bg-slate-700">{result}</p>}
        <div className="mt-3 flex gap-2">
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const response = await generateAIResponse(pageKey, { valor1: v1, valor2: v2, resultado: v1 + v2 });
              setResult(response.text);
              setLoading(false);
            }}
          >
            {loading ? 'Gerando...' : 'Gerar com IA'}
          </Button>
          <Button
            className="bg-slate-700 hover:bg-slate-800"
            onClick={() => {
              storage.saveIAResult({ id: crypto.randomUUID(), page: pageKey, title, content: result || calc, createdAt: new Date().toISOString() });
              setToast('Resultado salvo');
              setTimeout(() => setToast(''), 1800);
            }}
          >Salvar resultado</Button>
        </div>
      </Card>
      <Card title="Resultados salvos">
        <div className="space-y-2">
          {saved.length === 0 && <p className="text-sm text-slate-500">Nenhum resultado salvo.</p>}
          {saved.map((item) => (
            <div key={item.id} className="flex items-start justify-between rounded border p-2 text-sm">
              <div>
                <p>{item.content}</p>
                <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString('pt-BR')}</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => { storage.deleteIAResult(item.id); setToast('Resultado removido'); setTimeout(() => setToast(''), 1800); }}>Excluir</Button>
            </div>
          ))}
        </div>
      </Card>
      <Toast message={toast} />
    </AppShell>
  );
}
