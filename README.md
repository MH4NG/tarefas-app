# 📋 Gerenciador de Tarefas

Aplicação de listagem e adição de tarefas construída com **Next.js 16 (App Router)** e **TypeScript**.

---

## Funcionalidades

- Listagem de tarefas carregadas via Server Component
- Adição de novas tarefas por formulário controlado com validação
- Marcar e desmarcar tarefas como concluídas clicando nelas
- Filtrar tarefas por estado: todas, concluídas ou pendentes
- Contadores reativos de total, concluídas e pendentes

---

## Conceitos demonstrados

| Conceito | Onde |
|---|---|
| Server Component com `async/await` | `app/page.tsx` |
| Client Component com formulário controlado | `components/NovaTarefa.tsx` |
| Hook personalizado | `hooks/useContadorDeTarefas.ts` |
| Simulação de fetch com `Promise.resolve()` | `lib/tarefas.ts` |
| Testes unitários com Jest e Testing Library | `tests/` |

---

## Estrutura do projeto

```
tarefas-app/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Server Component (carrega dados)
│   └── globals.css         # Estilos globais
├── components/
│   ├── NovaTarefa.tsx      # Client Component — formulário controlado
│   └── ListaDeTarefas.tsx  # Client Component — lista, filtros e contadores
├── hooks/
│   └── useContadorDeTarefas.ts  # Hook personalizado
├── lib/
│   └── tarefas.ts          # Dados simulados (mock de API)
└── tests/
    ├── components/
    │   ├── NovaTarefa.test.tsx
    │   └── ListaDeTarefas.test.tsx
    ├── hooks/
    │   └── useContadorDeTarefas.test.ts
    ├── lib/
    │   └── tarefas.test.ts
    └── pages/
        └── page.test.tsx
```

---

## Como executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (acessível na rede local)
npm run dev

# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

Após iniciar, acesse `http://localhost:3000` no navegador.

---

## Resultado dos testes

```
tests/lib/tarefas.test.ts                   (6 testes)
tests/hooks/useContadorDeTarefas.test.ts   (19 testes)
tests/components/NovaTarefa.test.tsx       (20 testes)
tests/components/ListaDeTarefas.test.tsx   (19 testes)
tests/pages/page.test.tsx                  (14 testes)

Test Suites: 5 passed
Tests:       78 passed
```

---

## Tecnologias

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) — test runner
- [Testing Library](https://testing-library.com/) — testes de componentes
- [Tailwind CSS](https://tailwindcss.com/) — utilitários de estilo
