export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return <div className="fixed bottom-4 right-4 rounded-lg bg-slate-900 px-4 py-2 text-white">{message}</div>;
}
