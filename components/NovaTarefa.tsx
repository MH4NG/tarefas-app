"use client";

import { useState } from "react";
import type { Tarefa } from "@/lib/tarefas";

type Props = {
  onAdicionar: (tarefa: Tarefa) => void;
  totalAtual: number;
};

export default function NovaTarefa({ onAdicionar, totalAtual }: Props) {
  const [titulo, setTitulo] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const tituloTrimmed = titulo.trim();
    if (!tituloTrimmed) {
      setErro("O título não pode estar vazio.");
      return;
    }
    if (tituloTrimmed.length < 3) {
      setErro("O título deve ter pelo menos 3 caracteres.");
      return;
    }

    const nova: Tarefa = {
      id: totalAtual + 1,
      titulo: tituloTrimmed,
      concluida: false,
    };

    onAdicionar(nova);
    setTitulo("");
    setErro("");
  }

  return (
    <form onSubmit={handleSubmit} className="nova-tarefa-form" noValidate>
      <div className="input-group">
        <input
          type="text"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (erro) setErro("");
          }}
          placeholder="Nova tarefa..."
          aria-label="Título da nova tarefa"
          className={erro ? "input-erro" : ""}
          maxLength={100}
        />
        <button type="submit" aria-label="Adicionar tarefa">
          Adicionar
        </button>
      </div>
      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}
    </form>
  );
}
