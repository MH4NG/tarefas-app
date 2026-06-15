export type Tarefa = {
  id: number;
  titulo: string;
  concluida: boolean;
};

const tarefasIniciais: Tarefa[] = [
  { id: 1, titulo: "Aprender Next.js App Router", concluida: true },
  { id: 2, titulo: "Criar componentes com TypeScript", concluida: false },
  { id: 3, titulo: "Escrever testes com Vitest", concluida: false },
  { id: 4, titulo: "Publicar projeto no GitHub", concluida: false },
];

export async function getTarefas(): Promise<Tarefa[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Promise.resolve([...tarefasIniciais]);
}
