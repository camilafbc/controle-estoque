"use client";

import * as yup from "yup";
import { ReactNode, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MySelect } from "@/components/MySelect";
import { Switch } from "@/components/ui/switch";
import { useGetTurma } from "@/queries/turmas";
import {
  useInsertTurmaMutation,
  useUpdateTurmaMutation,
} from "@/mutations/turmas";
import { AxiosError } from "axios";

interface TurmaDialogProps {
  isOpen?: boolean;
  setIsOpen: (state: boolean) => void;
  editingId: number | null;
}

const validationSchema = yup.object({
  codigo: yup.string().required("Campo obrigatório"),
  turno: yup.string().required("Campo obrigatório"),
  status: yup.boolean(),
});

type FormData = yup.InferType<typeof validationSchema>;

export function TurmaDialog({
  editingId,
  isOpen,
  setIsOpen,
}: TurmaDialogProps) {
  const id = editingId?.toString();
  const { data: turmaData, isLoading } = useGetTurma(id || "");

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: true,
    },
  });

  useEffect(() => {
    if (isOpen && turmaData) {
      reset({
        codigo: turmaData.codigoTurma,
        turno: turmaData.turnoTurma,
        status: turmaData.status,
      });
    }
  }, [isOpen, turmaData, reset]);

  const turma = useInsertTurmaMutation();
  const updateTurma = useUpdateTurmaMutation();

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleForm: SubmitHandler<FormData> = (data) => {
    const turmaData = {
      codigo: data.codigo,
      turno: data.turno,
      status: data.status,
    };
    if (editingId) {
      const upTurmaData = { ...turmaData, idTurma: +editingId };
      updateTurma.mutate(upTurmaData, {
        onSuccess: (response) => {
          //console.log(response);
          if (response.status === 200) {
            toast.success(response.data.message);
            reset();
          } else {
            toast.error(response.data.message);
          }
        },
        onError: (error) => {
          const axiosError = error as AxiosError<Error>;
          const errorMessage =
            axiosError?.response?.data?.message ||
            error.message ||
            "Ocorreu um erro desconhecido";
          toast.error(errorMessage);
        },
      });
    } else {
      turma.mutate(turmaData, {
        onSuccess: (response) => {
          // console.log("RESPONSE", response);
          if (response.status === 201) {
            toast.success(response.data.message);
            reset();
          } else {
            toast.error(response.data.message);
          }
        },
        onError: (error) => {
          const axiosError = error as AxiosError<Error>;
          const errorMessage =
            axiosError?.response?.data?.message ||
            error.message ||
            "Ocorreu um erro desconhecido";
          toast.error(errorMessage);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby="#dialog-description"
        className="m-2 w-[300px] max-w-lg sm:m-0 sm:w-full md:max-w-2xl lg:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-700">
            {editingId
              ? `Editando Turma ${turmaData?.codigoTurma || ""}`
              : "Cadastro de Turma"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <hr />

        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          <div className="flex flex-wrap gap-8">
            <div>
              <Input
                id="input-codigo-turma"
                label="Código"
                placeholder="Informe o código da turma"
                infoText="Dígitos que identificam a turma"
                error={!!errors.codigo}
                {...register("codigo")}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.codigo && errors.codigo.message}
              </span>
            </div>
            <div>
              <Controller
                control={control}
                name="turno"
                render={({ field }) => (
                  <MySelect
                    {...field}
                    label="Turno:"
                    id="select-option"
                    options={[
                      { label: "Manhã", value: "Manhã" },
                      { label: "Tarde", value: "Tarde" },
                      { label: "Noite", value: "Noite" },
                    ]}
                    placeholder="Selecione uma opção"
                    error={!!errors.turno}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  />
                )}
              />
              <span className="min-h-4 text-xs font-semibold text-destructive">
                {errors.turno && errors.turno.message}
              </span>
            </div>
            <div className="mb-2 flex items-end gap-2">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label className="mb-1">Ativa</Label>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <Button variant={"outline"} onClick={handleClose}>
              Fechar
            </Button>
            <Button type="submit" className="hover:bg-orange-500/90">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
