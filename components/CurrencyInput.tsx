'use client';
import { Input } from './Input';

export function CurrencyInput({ value, onValueChange, ...props }: { value: number; onValueChange: (v: number) => void; placeholder?: string }) {
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
  return (
    <Input
      {...props}
      value={formatted}
      onChange={(e) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        onValueChange(Number(onlyNumbers) / 100);
      }}
    />
  );
}
