"use client";

import { useState, useCallback } from "react";
import type { Tarefa } from "@/lib/tarefas";

type UseContadorDeTarefasReturn = {
  tarefas: Tarefa[];
  total: number;
  concluidas: number;
  pendentes: number;
  adicionarTarefa: (nova: Tarefa) => void;
  toggleTarefa: (id: number) => void;
};

export function useContadorDeTarefas(
  tarefasIniciais: Tarefa[]
): UseContadorDeTarefasReturn {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);

  const adicionarTarefa = useCallback((nova: Tarefa) => {
    setTarefas((prev) => [...prev, nova]);
  }, []);

  const toggleTarefa = useCallback((id: number) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  }, []);

  const concluidas = tarefas.filter((t) => t.concluida).length;

  return {
    tarefas,
    total: tarefas.length,
    concluidas,
    pendentes: tarefas.length - concluidas,
    adicionarTarefa,
    toggleTarefa,
  };
}
