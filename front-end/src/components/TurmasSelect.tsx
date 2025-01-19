"use client";

import { Controller, Control, useForm, UseFormSetValue } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Turma } from "@/types/Turma";
import { handleInputErrorClass } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTurmas } from "@/queries/turmas";

interface TurmaSelectProps {
  name: string;
  control: Control<any>;
  setValue?: UseFormSetValue<any>; // Adicionado para receber a função setValue
  error?: string;
}

export function TurmaSelect({
  name,
  control,
  setValue,
  error,
}: TurmaSelectProps) {
  const { data: turmas, isLoading, isError } = useTurmas();

  useEffect(() => {
    if (turmas && turmas.length > 0) {
      if (setValue) setValue(name, turmas[0].idTurma.toString()); // Atualiza o valor do campo 'turma'
    }
  }, [turmas, setValue, name]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
            if (setValue) {
              setValue(name, value);
            }
          }}
          aria-invalid={!!error}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione uma turma" />
          </SelectTrigger>
          <SelectContent>
            {turmas && turmas.length > 0 ? (
              turmas
                .filter((turma: Turma) => turma.status === 1)
                .map((turma: Turma) => (
                  <SelectItem
                    key={turma.idTurma}
                    value={turma.idTurma.toString()}
                  >
                    {turma.codigoTurma} - {turma.turnoTurma}
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="0" disabled>
                Ainda não há turmas disponíveis
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}
    />
  );
}
