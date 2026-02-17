'use client';
import { Input } from './Input';

export function PercentageInput({ value, onValueChange }: { value: number; onValueChange: (v: number) => void }) {
  return <Input value={value} onChange={(e) => onValueChange(Number(e.target.value))} type="number" min={0} max={100} step="0.1" />;
}
