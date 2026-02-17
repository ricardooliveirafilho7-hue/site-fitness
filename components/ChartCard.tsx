import { ReactNode } from 'react';
import { Card } from './Card';

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return <Card title={title}><div className="h-72">{children}</div></Card>;
}
