"use client";

import { useState } from "react";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import NovaTarefa from "@/components/NovaTarefa";
import type { Tarefa } from "@/lib/tarefas";

type Filtro = "todas" | "concluidas" | "pendentes";

type Props = {
  tarefasIniciais: Tarefa[];
};

export default function ListaDeTarefas({ tarefasIniciais }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const { tarefas, total, concluidas, pendentes, adicionarTarefa, toggleTarefa } =
    useContadorDeTarefas(tarefasIniciais);

  function handleFiltro(novoFiltro: Filtro) {
    setFiltro((prev) => (prev === novoFiltro ? "todas" : novoFiltro));
  }

  const tarefasExibidas = tarefas.filter((t) => {
    if (filtro === "concluidas") return t.concluida;
    if (filtro === "pendentes") return !t.concluida;
    return true;
  });

  return (
    <div className="lista-container">
      <div className="contadores">
        <button
          className={`contador total ${filtro === "todas" ? "ativo" : ""}`}
          title="Total de tarefas"
          onClick={() => handleFiltro("todas")}
          aria-pressed={filtro === "todas"}
        >
          <strong>{total}</strong> total
        </button>
        <button
          className={`contador concluidas ${filtro === "concluidas" ? "ativo" : ""}`}
          title="Tarefas concluídas"
          onClick={() => handleFiltro("concluidas")}
          aria-pressed={filtro === "concluidas"}
        >
          <strong>{concluidas}</strong> concluída{concluidas !== 1 ? "s" : ""}
        </button>
        <button
          className={`contador pendentes ${filtro === "pendentes" ? "ativo" : ""}`}
          title="Tarefas pendentes"
          onClick={() => handleFiltro("pendentes")}
          aria-pressed={filtro === "pendentes"}
        >
          <strong>{pendentes}</strong> pendente{pendentes !== 1 ? "s" : ""}
        </button>
      </div>

      <NovaTarefa onAdicionar={adicionarTarefa} totalAtual={total} />

      <ul className="lista-tarefas" aria-label="Lista de tarefas">
        {tarefasExibidas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`item-tarefa ${tarefa.concluida ? "concluida" : ""}`}
            onClick={() => toggleTarefa(tarefa.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleTarefa(tarefa.id)}
            aria-label={`${tarefa.titulo} — ${tarefa.concluida ? "concluída, clique para reabrir" : "pendente, clique para concluir"}`}
          >
            <span className="status-icone" aria-hidden="true">
              {tarefa.concluida ? "✓" : "○"}
            </span>
            <span className="titulo-tarefa">{tarefa.titulo}</span>
            {tarefa.concluida && (
              <span className="badge-concluida" aria-label="Concluída">
                concluída
              </span>
            )}
          </li>
        ))}
      </ul>

      {tarefasExibidas.length === 0 && (
        <p className="lista-vazia">
          {filtro === "concluidas" && "Nenhuma tarefa concluída ainda."}
          {filtro === "pendentes" && "Nenhuma tarefa pendente. Tudo feito! 🎉"}
          {filtro === "todas" && "Nenhuma tarefa ainda. Adicione uma!"}
        </p>
      )}
    </div>
  );
}
