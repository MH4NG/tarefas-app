import { renderHook, act } from "@testing-library/react";
import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import type { Tarefa } from "@/lib/tarefas";

const fixture: Tarefa[] = [
  { id: 1, titulo: "Tarefa A", concluida: true },
  { id: 2, titulo: "Tarefa B", concluida: false },
  { id: 3, titulo: "Tarefa C", concluida: false },
];

describe("useContadorDeTarefas › valores retornados", () => {
  it("expõe total, concluidas, pendentes, adicionarTarefa e toggleTarefa", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    expect(result.current).toHaveProperty("total");
    expect(result.current).toHaveProperty("concluidas");
    expect(result.current).toHaveProperty("pendentes");
    expect(typeof result.current.adicionarTarefa).toBe("function");
    expect(typeof result.current.toggleTarefa).toBe("function");
  });

  it("total reflete o número de tarefas passadas", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    expect(result.current.total).toBe(3);
  });

  it("concluidas conta apenas as com concluida === true", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    expect(result.current.concluidas).toBe(1);
  });

  it("pendentes conta apenas as com concluida === false", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    expect(result.current.pendentes).toBe(2);
  });

  it("invariante: total === concluidas + pendentes sempre", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    const { total, concluidas, pendentes } = result.current;
    expect(total).toBe(concluidas + pendentes);
  });
});

describe("useContadorDeTarefas › casos extremos", () => {
  it("lista vazia: total = 0, concluidas = 0, pendentes = 0", () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));
    expect(result.current.total).toBe(0);
    expect(result.current.concluidas).toBe(0);
    expect(result.current.pendentes).toBe(0);
  });

  it("todas concluídas: pendentes = 0", () => {
    const todas: Tarefa[] = [
      { id: 1, titulo: "X", concluida: true },
      { id: 2, titulo: "Y", concluida: true },
    ];
    const { result } = renderHook(() => useContadorDeTarefas(todas));
    expect(result.current.pendentes).toBe(0);
    expect(result.current.concluidas).toBe(2);
  });

  it("nenhuma concluída: concluidas = 0", () => {
    const nenhuma: Tarefa[] = [
      { id: 1, titulo: "A", concluida: false },
      { id: 2, titulo: "B", concluida: false },
    ];
    const { result } = renderHook(() => useContadorDeTarefas(nenhuma));
    expect(result.current.concluidas).toBe(0);
    expect(result.current.pendentes).toBe(2);
  });
});

describe("useContadorDeTarefas › adicionarTarefa", () => {
  it("incrementa total ao adicionar uma tarefa pendente", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => {
      result.current.adicionarTarefa({ id: 4, titulo: "Nova", concluida: false });
    });
    expect(result.current.total).toBe(4);
  });

  it("incrementa pendentes ao adicionar tarefa não concluída", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => {
      result.current.adicionarTarefa({ id: 4, titulo: "Nova", concluida: false });
    });
    expect(result.current.pendentes).toBe(3);
  });

  it("incrementa concluidas ao adicionar tarefa já concluída", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => {
      result.current.adicionarTarefa({ id: 4, titulo: "Feita", concluida: true });
    });
    expect(result.current.concluidas).toBe(2);
    expect(result.current.pendentes).toBe(2);
  });

  it("invariante se mantém após adicionarTarefa", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => {
      result.current.adicionarTarefa({ id: 4, titulo: "Nova", concluida: false });
    });
    const { total, concluidas, pendentes } = result.current;
    expect(total).toBe(concluidas + pendentes);
  });

  it("adicionarTarefa é estável entre re-renders", () => {
    const { result, rerender } = renderHook(() => useContadorDeTarefas(fixture));
    const fn1 = result.current.adicionarTarefa;
    rerender();
    const fn2 = result.current.adicionarTarefa;
    expect(fn1).toBe(fn2);
  });
});

describe("useContadorDeTarefas › toggleTarefa", () => {
  it("marca uma tarefa pendente como concluída", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => { result.current.toggleTarefa(2); });
    expect(result.current.concluidas).toBe(2);
    expect(result.current.pendentes).toBe(1);
  });

  it("reabre uma tarefa concluída", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => { result.current.toggleTarefa(1); });
    expect(result.current.concluidas).toBe(0);
    expect(result.current.pendentes).toBe(3);
  });

  it("total não muda após toggle", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => { result.current.toggleTarefa(2); });
    expect(result.current.total).toBe(3);
  });

  it("dois toggles seguidos voltam ao estado original", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => { result.current.toggleTarefa(2); });
    act(() => { result.current.toggleTarefa(2); });
    expect(result.current.concluidas).toBe(1);
    expect(result.current.pendentes).toBe(2);
  });

  it("invariante se mantém após toggle", () => {
    const { result } = renderHook(() => useContadorDeTarefas(fixture));
    act(() => { result.current.toggleTarefa(1); });
    const { total, concluidas, pendentes } = result.current;
    expect(total).toBe(concluidas + pendentes);
  });

  it("toggleTarefa é estável entre re-renders", () => {
    const { result, rerender } = renderHook(() => useContadorDeTarefas(fixture));
    const fn1 = result.current.toggleTarefa;
    rerender();
    const fn2 = result.current.toggleTarefa;
    expect(fn1).toBe(fn2);
  });
});
