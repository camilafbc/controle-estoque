import { create } from "zustand";

type TurmaState = {
  selectedTurma: string;
  setSelectedTurma: (turma: string) => void;
};

export const useTurmaStore = create<TurmaState>((set) => ({
  selectedTurma: "",
  setSelectedTurma: (turma: string) => set({ selectedTurma: turma }),
}));
