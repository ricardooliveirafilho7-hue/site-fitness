export function RiskBadge({ risk }: { risk: 'green' | 'yellow' | 'red' }) {
  const styles = {
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    red: 'bg-red-100 text-red-700'
  };
  const label = { green: 'Baixo risco', yellow: 'Risco moderado', red: 'Alto risco' }[risk];
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[risk]}`}>{label}</span>;
}
