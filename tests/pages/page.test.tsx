import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home (page.tsx) › estrutura", () => {
  it("renderiza o título principal", async () => {
    render(await Home());
    expect(screen.getByRole("heading", { name: /gerenciador de tarefas/i })).toBeInTheDocument();
  });

  it("renderiza o subtítulo", async () => {
    render(await Home());
    expect(screen.getByText("Organize seu dia com simplicidade")).toBeInTheDocument();
  });

  it("possui uma região main como container semântico", async () => {
    render(await Home());
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renderiza o formulário de nova tarefa", async () => {
    render(await Home());
    expect(screen.getByPlaceholderText("Nova tarefa...")).toBeInTheDocument();
  });

  it("renderiza o botão Adicionar", async () => {
    render(await Home());
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
  });
});

describe("Home (page.tsx) › tarefas carregadas", () => {
  it("renderiza a lista de tarefas", async () => {
    render(await Home());
    expect(screen.getByRole("list", { name: "Lista de tarefas" })).toBeInTheDocument();
  });

  it("exibe as 4 tarefas do arquivo de dados", async () => {
    render(await Home());
    const itens = screen.getAllByRole("button", { name: /clique para/i });
    expect(itens).toHaveLength(4);
  });

  it("exibe Aprender Next.js App Router", async () => {
    render(await Home());
    expect(screen.getByText("Aprender Next.js App Router")).toBeInTheDocument();
  });

  it("exibe Criar componentes com TypeScript", async () => {
    render(await Home());
    expect(screen.getByText("Criar componentes com TypeScript")).toBeInTheDocument();
  });

  it("exibe Escrever testes com Vitest", async () => {
    render(await Home());
    expect(screen.getByText("Escrever testes com Vitest")).toBeInTheDocument();
  });

  it("exibe Publicar projeto no GitHub", async () => {
    render(await Home());
    expect(screen.getByText("Publicar projeto no GitHub")).toBeInTheDocument();
  });
});

describe("Home (page.tsx) › contadores", () => {
  it("total exibe 4", async () => {
    render(await Home());
    expect(screen.getByTitle("Total de tarefas")).toHaveTextContent("4");
  });

  it("concluídas exibe 1", async () => {
    render(await Home());
    expect(screen.getByTitle("Tarefas concluídas")).toHaveTextContent("1");
  });

  it("pendentes exibe 3", async () => {
    render(await Home());
    expect(screen.getByTitle("Tarefas pendentes")).toHaveTextContent("3");
  });
});
