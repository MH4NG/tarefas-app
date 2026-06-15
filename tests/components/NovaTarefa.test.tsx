import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NovaTarefa from "@/components/NovaTarefa";

function setup(onAdicionar = jest.fn(), totalAtual = 3) {
  const user = userEvent.setup();
  render(<NovaTarefa onAdicionar={onAdicionar} totalAtual={totalAtual} />);
  return { user, onAdicionar };
}

describe("NovaTarefa › renderização", () => {
  it("renderiza o campo de input", () => {
    setup();
    expect(screen.getByPlaceholderText("Nova tarefa...")).toBeInTheDocument();
  });

  it("renderiza o botão Adicionar", () => {
    setup();
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument();
  });

  it("input possui aria-label para acessibilidade", () => {
    setup();
    expect(screen.getByLabelText("Título da nova tarefa")).toBeInTheDocument();
  });

  it("input começa vazio", () => {
    setup();
    expect(screen.getByPlaceholderText("Nova tarefa...")).toHaveValue("");
  });

  it("mensagem de erro não está visível no estado inicial", () => {
    setup();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("NovaTarefa › validação", () => {
  it("exibe erro ao submeter com campo vazio", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByText("O título não pode estar vazio.")).toBeInTheDocument();
  });

  it("exibe erro ao submeter com menos de 3 caracteres", async () => {
    const { user } = setup();
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "AB");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByText("O título deve ter pelo menos 3 caracteres.")).toBeInTheDocument();
  });

  it("mensagem de erro tem role=alert", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("aplica a classe CSS input-erro no campo com valor inválido", async () => {
    const { user } = setup();
    const input = screen.getByPlaceholderText("Nova tarefa...");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(input).toHaveClass("input-erro");
  });

  it("remove o erro ao começar a corrigir o texto", async () => {
    const { user } = setup();
    const input = screen.getByPlaceholderText("Nova tarefa...");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    await user.type(input, "X");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toHaveClass("input-erro");
  });

  it("título composto só de espaços é tratado como vazio", async () => {
    const { user, onAdicionar } = setup();
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "   ");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onAdicionar).not.toHaveBeenCalled();
  });

  it("não chama onAdicionar enquanto a validação falha", async () => {
    const { user, onAdicionar } = setup();
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdicionar).not.toHaveBeenCalled();
  });
});

describe("NovaTarefa › submissão", () => {
  it("chama onAdicionar com a tarefa correta ao clicar no botão", async () => {
    const onAdicionar = jest.fn();
    const { user } = setup(onAdicionar, 5);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Estudar TypeScript");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdicionar).toHaveBeenCalledTimes(1);
    expect(onAdicionar).toHaveBeenCalledWith({
      id: 6,
      titulo: "Estudar TypeScript",
      concluida: false,
    });
  });

  it("o id da nova tarefa é totalAtual + 1", async () => {
    const onAdicionar = jest.fn();
    const { user } = setup(onAdicionar, 9);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Décima");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdicionar).toHaveBeenCalledWith(expect.objectContaining({ id: 10 }));
  });

  it("nova tarefa sempre começa com concluida: false", async () => {
    const onAdicionar = jest.fn();
    const { user } = setup(onAdicionar, 0);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Qualquer");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdicionar).toHaveBeenCalledWith(expect.objectContaining({ concluida: false }));
  });

  it("remove espaços das bordas do título antes de enviar", async () => {
    const onAdicionar = jest.fn();
    const { user } = setup(onAdicionar, 0);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "  Tarefa com espaços  ");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdicionar).toHaveBeenCalledWith(
      expect.objectContaining({ titulo: "Tarefa com espaços" })
    );
  });

  it("limpa o campo após submissão bem-sucedida", async () => {
    const { user } = setup();
    const input = screen.getByPlaceholderText("Nova tarefa...");
    await user.type(input, "Tarefa qualquer");
    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(input).toHaveValue("");
  });

  it("submete ao pressionar Enter dentro do input", async () => {
    const onAdicionar = jest.fn();
    const { user } = setup(onAdicionar, 0);
    await user.type(screen.getByPlaceholderText("Nova tarefa..."), "Via Enter{Enter}");
    expect(onAdicionar).toHaveBeenCalledTimes(1);
  });
});
