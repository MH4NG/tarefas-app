import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaDeTarefas from "@/components/ListaDeTarefas";
import type { Tarefa } from "@/lib/tarefas";

const tarefasMock: Tarefa[] = [
  { id: 1, titulo: "Tarefa concluída", concluida: true },
  { id: 2, titulo: "Tarefa pendente A", concluida: false },
  { id: 3, titulo: "Tarefa pendente B", concluida: false },
];

describe("ListaDeTarefas › renderização", () => {
  it("renderiza todos os itens recebidos via props", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente A")).toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente B")).toBeInTheDocument();
  });

  it("exibe o badge concluída apenas nas tarefas concluídas", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getAllByLabelText("Concluída")).toHaveLength(1);
  });

  it("exibe mensagem de estado vazio quando não há tarefas", () => {
    render(<ListaDeTarefas tarefasIniciais={[]} />);
    expect(screen.getByText("Nenhuma tarefa ainda. Adicione uma!")).toBeInTheDocument();
  });

  it("lista tem aria-label descritivo", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByRole("list", { name: "Lista de tarefas" })).toBeInTheDocument();
  });
});

describe("ListaDeTarefas › contadores", () => {
  it("exibe os três botões de filtro", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByTitle("Total de tarefas")).toBeInTheDocument();
    expect(screen.getByTitle("Tarefas concluídas")).toBeInTheDocument();
    expect(screen.getByTitle("Tarefas pendentes")).toBeInTheDocument();
  });

  it("os contadores são botões clicáveis", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByTitle("Total de tarefas").tagName).toBe("BUTTON");
    expect(screen.getByTitle("Tarefas concluídas").tagName).toBe("BUTTON");
    expect(screen.getByTitle("Tarefas pendentes").tagName).toBe("BUTTON");
  });

  it("exibe os valores corretos nos contadores", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByTitle("Total de tarefas")).toHaveTextContent("3");
    expect(screen.getByTitle("Tarefas concluídas")).toHaveTextContent("1");
    expect(screen.getByTitle("Tarefas pendentes")).toHaveTextContent("2");
  });

  it("contador total começa com aria-pressed=true", () => {
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    expect(screen.getByTitle("Total de tarefas")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTitle("Tarefas concluídas")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTitle("Tarefas pendentes")).toHaveAttribute("aria-pressed", "false");
  });
});

describe("ListaDeTarefas › filtro", () => {
  it("filtro concluídas exibe só as concluídas", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.click(screen.getByTitle("Tarefas concluídas"));
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa pendente A")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarefa pendente B")).not.toBeInTheDocument();
  });

  it("filtro pendentes exibe só as pendentes", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.click(screen.getByTitle("Tarefas pendentes"));
    expect(screen.queryByText("Tarefa concluída")).not.toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente A")).toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente B")).toBeInTheDocument();
  });

  it("filtro total volta a exibir todas as tarefas", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.click(screen.getByTitle("Tarefas pendentes"));
    await user.click(screen.getByTitle("Total de tarefas"));
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente A")).toBeInTheDocument();
  });

  it("clicar no filtro ativo volta para todas", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.click(screen.getByTitle("Tarefas concluídas"));
    await user.click(screen.getByTitle("Tarefas concluídas"));
    expect(screen.getByText("Tarefa pendente A")).toBeInTheDocument();
    expect(screen.getByText("Tarefa concluída")).toBeInTheDocument();
  });

  it("filtro concluídas mostra mensagem quando não há nenhuma", async () => {
    const user = userEvent.setup();
    const soPendentes: Tarefa[] = [{ id: 1, titulo: "A", concluida: false }];
    render(<ListaDeTarefas tarefasIniciais={soPendentes} />);
    await user.click(screen.getByTitle("Tarefas concluídas"));
    expect(screen.getByText("Nenhuma tarefa concluída ainda.")).toBeInTheDocument();
  });

  it("filtro pendentes mostra mensagem quando não há nenhuma", async () => {
    const user = userEvent.setup();
    const soConcluidas: Tarefa[] = [{ id: 1, titulo: "A", concluida: true }];
    render(<ListaDeTarefas tarefasIniciais={soConcluidas} />);
    await user.click(screen.getByTitle("Tarefas pendentes"));
    expect(screen.getByText(/tudo feito/i)).toBeInTheDocument();
  });
});

describe("ListaDeTarefas › toggle de tarefa", () => {
  it("clicar numa tarefa pendente adiciona o badge concluída", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    const itemPendente = screen.getByRole("button", { name: /Tarefa pendente A — pendente/i });
    await user.click(itemPendente);
    expect(screen.getAllByLabelText("Concluída")).toHaveLength(2);
  });

  it("clicar numa tarefa concluída remove o badge concluída", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    const itemConcluido = screen.getByRole("button", { name: /Tarefa concluída — concluída/i });
    await user.click(itemConcluido);
    expect(screen.queryAllByLabelText("Concluída")).toHaveLength(0);
  });

  it("toggle atualiza o contador de concluídas", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.click(screen.getByRole("button", { name: /Tarefa pendente A — pendente/i }));
    expect(screen.getByTitle("Tarefas concluídas")).toHaveTextContent("2");
    expect(screen.getByTitle("Tarefas pendentes")).toHaveTextContent("1");
  });

  it("dois cliques na mesma tarefa voltam ao estado original", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    const item = screen.getByRole("button", { name: /Tarefa pendente A — pendente/i });
    await user.click(item);
    await user.click(screen.getByText("Tarefa pendente A").closest("[role=button]")!);
    expect(screen.getByTitle("Tarefas concluídas")).toHaveTextContent("1");
    expect(screen.getByTitle("Tarefas pendentes")).toHaveTextContent("2");
  });
});

describe("ListaDeTarefas › adição de tarefas", () => {
  it("nova tarefa aparece na lista", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Tarefa nova");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByText("Tarefa nova")).toBeInTheDocument();
  });

  it("contador total incrementa ao adicionar", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Nova");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByTitle("Total de tarefas")).toHaveTextContent("4");
  });

  it("campo limpa após adição", async () => {
    const user = userEvent.setup();
    render(<ListaDeTarefas tarefasIniciais={tarefasMock} />);
    const input = screen.getByPlaceholderText("Nova tarefa...");
    await user.type(input, "Tarefa X");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(input).toHaveValue("");
  });
});
