import { getTarefas } from "@/lib/tarefas";
import type { Tarefa } from "@/lib/tarefas";

describe("getTarefas()", () => {
  it("resolve com um array", async () => {
    await expect(getTarefas()).resolves.toEqual(expect.any(Array));
  });

  it("retorna pelo menos uma tarefa", async () => {
    const tarefas = await getTarefas();
    expect(tarefas.length).toBeGreaterThan(0);
  });

  it("cada tarefa possui as propriedades id, titulo e concluida", async () => {
    const tarefas = await getTarefas();
    tarefas.forEach((t: Tarefa) => {
      expect(t).toHaveProperty("id");
      expect(t).toHaveProperty("titulo");
      expect(t).toHaveProperty("concluida");
    });
  });

  it("id é number, titulo é string, concluida é boolean", async () => {
    const tarefas = await getTarefas();
    tarefas.forEach((t: Tarefa) => {
      expect(typeof t.id).toBe("number");
      expect(typeof t.titulo).toBe("string");
      expect(typeof t.concluida).toBe("boolean");
    });
  });

  it("retorna uma cópia nova a cada chamada", async () => {
    const a = await getTarefas();
    const b = await getTarefas();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });

  it("contém pelo menos uma tarefa concluída e uma pendente", async () => {
    const tarefas = await getTarefas();
    expect(tarefas.some((t) => t.concluida === true)).toBe(true);
    expect(tarefas.some((t) => t.concluida === false)).toBe(true);
  });
});
