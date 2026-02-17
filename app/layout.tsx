import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CaixaSeguro Restaurante',
  description: 'SaaS para previsão de lucro e risco financeiro em restaurantes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
