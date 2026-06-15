# 📋 Gerenciador de Tarefas

Aplicação educacional de listagem e adição de tarefas construída com **Next.js 15 (App Router)** e **TypeScript**, demonstrando conceitos fundamentais do ecossistema React moderno.

---

## Conceitos demonstrados

| Conceito | Onde |
|---|---|
| Server Component com `async/await` | `app/page.tsx` |
| Client Component com formulário controlado | `components/NovaTarefa.tsx` |
| Hook personalizado | `hooks/useContadorDeTarefas.ts` |
| Simulação de fetch com `Promise.resolve()` | `lib/tarefas.ts` |
| Testes unitários com Vitest + Testing Library | `__tests__/` |

---

## Estrutura do projeto

```
tarefas-app/
├── app/
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Server Component (carrega dados)
│   └── globals.css              # Estilos globais
├── components/
│   ├── NovaTarefa.tsx           # Client Component — formulário controlado
│   └── ListaDeTarefas.tsx       # Client Component — lista + contadores
├── hooks/
│   └── useContadorDeTarefas.ts  # Hook personalizado
├── lib/
│   └── tarefas.ts               # Dados simulados (mock API)
└── __tests__/
    ├── tarefas.test.ts
    ├── useContadorDeTarefas.test.ts
    ├── NovaTarefa.test.tsx
    └── ListaDeTarefas.test.tsx
```

---

## Como executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Executar testes (uma vez)
npm test

# Executar testes em modo watch
npm run test:watch
```

---

## Resultado dos testes

```
✓ __tests__/tarefas.test.ts              (4 testes)
✓ __tests__/useContadorDeTarefas.test.ts (8 testes)
✓ __tests__/NovaTarefa.test.tsx          (10 testes)
✓ __tests__/ListaDeTarefas.test.tsx      (7 testes)

Test Files  4 passed (4)
Tests       29 passed (29)
```

---

## Tecnologias

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) — test runner
- [Testing Library](https://testing-library.com/) — testes de componentes
