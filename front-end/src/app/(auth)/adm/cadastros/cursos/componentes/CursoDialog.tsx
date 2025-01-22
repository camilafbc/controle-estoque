"use client";

import * as yup from "yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  useInsertCursoMutation,
  useUpdateCursoMutation,
} from "@/mutations/cursos";
import { useGetCurso } from "@/queries/cursos";
import { AxiosError } from "axios";

interface TurmaDialogProps {
  editingId: number | null;
  isOpen?: boolean;
  setIsOpen: (state: boolean) => void;
}

const validationSchema = yup.object({
  nomeCurso: yup.string().required("Campo obrigatório"),
  status: yup.boolean().required("Campo obrigatório"),
});

type FormData = yup.InferType<typeof validationSchema>;

export function TurmaDialog({
  editingId,
  isOpen,
  setIsOpen,
}: TurmaDialogProps) {
  const idCurso = editingId ? Number(editingId) : 0;

  const { data: cursoData, isLoading } = useGetCurso(idCurso);
  const curso = useInsertCursoMutation();
  const updateCurso = useUpdateCursoMutation();

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
    if (isOpen) {
      if (editingId != null && cursoData) {
        reset({
          nomeCurso: cursoData.nomeCurso,
          status: cursoData.status,
        });
      } else {
        reset({
          nomeCurso: "",
          status: true,
        });
      }
    }
  }, [isOpen, reset, cursoData, editingId]);

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleForm: SubmitHandler<FormData> = (data) => {
    const payload = {
      nomeCurso: data.nomeCurso,
      status: data.status,
    };
    console.log(payload);
    if (editingId) {
      const cursoData = { ...payload, idCurso: idCurso };
      updateCurso.mutate(cursoData, {
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
      curso.mutate(payload, {
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
        className="m-2 w-[300px] max-w-lg bg-card sm:m-0 sm:w-full md:max-w-2xl lg:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-700">
            {editingId
              ? `Editando Curso ${cursoData?.codigoTurma || ""}`
              : "Cadastro de Curso"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <hr />

        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-1">
              <Input
                id="input-curso"
                label="Curso"
                placeholder="Descrição"
                error={!!errors.nomeCurso}
                {...register("nomeCurso")}
                className={errors.nomeCurso ? "border border-destructive" : ""}
              />
              <span className="min-h-[16px] text-xs font-semibold text-destructive">
                {errors.nomeCurso?.message || ""}
              </span>
            </div>
            <div className="flex items-center gap-2 p-1">
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
              <Label>Ativo</Label>
            </div>
          </div>
          <div className="flex justify-end gap-4">
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
