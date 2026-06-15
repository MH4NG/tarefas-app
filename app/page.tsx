import { getTarefas } from "@/lib/tarefas";
import ListaDeTarefas from "@/components/ListaDeTarefas";

export default async function Home() {
  const tarefas = await getTarefas();

  return (
    <main className="main-container">
      <header className="app-header">
        <h1 className="app-titulo">
          <span className="titulo-icone">📋</span>
          Gerenciador de Tarefas
        </h1>
        <p className="app-subtitulo">
          Organize seu dia com simplicidade
        </p>
      </header>

      <ListaDeTarefas tarefasIniciais={tarefas} />
    </main>
  );
}
