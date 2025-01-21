"use client";

import { Controller, Control, UseFormSetValue } from "react-hook-form";
import { Turma } from "@/types/Turma";
import { useEffect } from "react";
import { useTurmas } from "@/queries/turmas";
import { MySelect } from "./MySelect";
import { useTurmaStore } from "@/stores/useTurmaStore";

interface TurmaSelectProps {
  name: string;
  control: Control<any>;
  setValue?: UseFormSetValue<any>;
  error?: string;
  required?: boolean;
}

export function TurmaSelect({ name, control, setValue }: TurmaSelectProps) {
  const { data: turmas, isLoading } = useTurmas();
  const { selectedTurma, setSelectedTurma } = useTurmaStore();

  // Define o valor inicial de forma síncrona quando as turmas são carregadas
  useEffect(() => {
    if (turmas?.length > 0) {
      const defaultValue = turmas[0].idTurma.toString();
      if (!selectedTurma) {
        setSelectedTurma(defaultValue);
      }
      if (setValue) {
        setValue(name, defaultValue);
      }
    }
  }, [turmas, setValue, name, selectedTurma, setSelectedTurma]);

  // Opções para o select
  const options =
    turmas
      ?.filter((turma: Turma) => turma.status === 1)
      .map((turma: Turma) => ({
        label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
        value: turma.idTurma.toString(),
      })) || [];

  // Carregando ou sem turmas
  if (isLoading || !turmas) {
    return <p>Carregando turmas...</p>;
  }

  return control ? (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MySelect
          {...field}
          label="Turma:"
          options={options}
          placeholder="Selecione uma opção"
          value={field.value || selectedTurma || ""} // Valor sincronizado
          onValueChange={(value) => {
            field.onChange(value);
            setSelectedTurma(value);
          }}
        />
      )}
    />
  ) : (
    <MySelect
      label="Turma:"
      options={options}
      placeholder="Selecione uma opção"
      value={selectedTurma || ""} // Valor inicial do Zustand
      onValueChange={setSelectedTurma}
    />
  );
}
