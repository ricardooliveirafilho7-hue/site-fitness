# CaixaSeguro Restaurante

SaaS web app para donos de restaurantes preverem lucro/prejuízo mensal com simuladores e IA.

## Estrutura de pastas

```text
.
├── app
│   ├── app
│   │   ├── config/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── evolucao/page.tsx
│   │   ├── ias
│   │   │   ├── alerta-risco/page.tsx
│   │   │   ├── meta-diaria/page.tsx
│   │   │   ├── plano-semanal/page.tsx
│   │   │   ├── precificacao-prato/page.tsx
│   │   │   ├── previsao-caixa/page.tsx
│   │   │   ├── simulador-promocao/page.tsx
│   │   │   └── page.tsx
│   │   ├── setup/page.tsx
│   │   ├── simulador/page.tsx
│   │   ├── page.tsx
│   │   └── evolucao/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── AppShell.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ChartCard.tsx
│   ├── CurrencyInput.tsx
│   ├── IAToolPage.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── PercentageInput.tsx
│   ├── RiskBadge.tsx
│   ├── Sidebar.tsx
│   └── Toast.tsx
├── lib
│   ├── financialEngine.ts
│   ├── openai.ts
│   └── storage.ts
└── ...arquivos de config Next.js/Tailwind/TypeScript
```

## Instalação

```bash
npm install
```

## Configurar OPENAI_API_KEY

Crie `.env.local`:

```bash
OPENAI_API_KEY=sua_chave_aqui
```

## Rodar local

```bash
npm run dev
```

## Build produção

```bash
npm run build
npm run start
```

## Checklist manual (20 passos)

1. Abrir landing e validar CTA para setup.
2. Ativar/desativar dark mode no navbar.
3. Entrar em `/app/setup`.
4. Validar erro com ticket médio zero.
5. Validar erro quando dia forte <= dia fraco.
6. Preencher etapa 1 com valores válidos.
7. Preencher etapa 2 com custos válidos.
8. Preencher etapa 3 e finalizar.
9. Confirmar redirecionamento ao dashboard.
10. Conferir cards de receita/lucro/break-even.
11. Conferir badge de risco (verde/amarelo/vermelho).
12. Conferir gráfico de linha de projeção mensal.
13. Conferir gráfico de barras semanal.
14. Clicar “Generate AI Plan” com chave ausente e validar erro claro.
15. Salvar snapshot no dashboard.
16. Acessar Evolução e validar snapshot exibido.
17. Excluir snapshot e validar remoção.
18. Acessar Simulador, alterar parâmetros e aplicar permanente.
19. Voltar ao Dashboard e validar impacto dos dados simulados.
20. Acessar cada página IA, gerar com IA/salvar/excluir resultado.
