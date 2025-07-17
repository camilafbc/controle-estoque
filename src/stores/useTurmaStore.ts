import { create } from "zustand";

type TurmaState = {
  selectedTurma: number;
  setSelectedTurma: (turma: number) => void;
};

export const useTurmaStore = create<TurmaState>((set) => ({
  selectedTurma: 0,
  setSelectedTurma: (turma: number) => set({ selectedTurma: turma }),
}));
