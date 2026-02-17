'use client';
import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { generateAIResponse } from '@/lib/openai';

export default function ConfigPage() {
  const [status, setStatus] = useState('');

  return (
    <AppShell>
      <Card title="Configuração IA">
        <p className="text-sm">A chave OPENAI_API_KEY é lida no servidor via process.env.</p>
        <p className="mt-2 text-sm">Configure em <code>.env.local</code>: <code>OPENAI_API_KEY=sua_chave</code></p>
        <Button className="mt-3" onClick={async () => {
          const res = await generateAIResponse('teste-config', { teste: true });
          setStatus(res.ok ? `✅ IA ativa: ${res.text}` : `❌ ${res.text}`);
        }}>Test AI</Button>
        {status && <p className="mt-3 rounded bg-slate-100 p-2 text-sm dark:bg-slate-700">{status}</p>}
      </Card>
    </AppShell>
  );
}
