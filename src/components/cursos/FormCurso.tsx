"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const validationSchema = yup.object({
  nomeCurso: yup.string().required("Campo obrigatório"),
  status: yup.boolean().required("Campo obrigatório"),
});

type FormCursoFields = yup.InferType<typeof validationSchema>;

interface FormCursoProps {
  initialValues?: Partial<FormCursoFields>;
  isLoading?: boolean;
  defaultFocus?: keyof FormCursoFields;
}

export interface FormCursoRef {
  resetForm: () => void;
  getValues: () => FormCursoFields;
}

const FormCurso = forwardRef<FormCursoRef, FormCursoProps>(
  ({ initialValues, isLoading = false, defaultFocus = "nomeCurso" }, ref) => {
    const form = useForm<FormCursoFields>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        nomeCurso: "",
        status: true,
      },
    });

    const { control, setFocus, reset, getValues } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          nomeCurso: "",
          status: true,
        });
      },
      getValues: () => getValues(),
    }));

    useEffect(() => {
      setFocus(defaultFocus);
    }, [defaultFocus, setFocus]);

    useEffect(() => {
      if (initialValues) {
        reset({
          nomeCurso: initialValues.nomeCurso ?? "",
          status: initialValues.status ?? true,
        });
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form className="grid grid-cols-1 gap-x-4 gap-y-6 py-8 lg:grid-cols-2">
          {/* Campo do Curso */}
          <FormField
            control={control}
            name="nomeCurso"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  {...field}
                  required
                  id="input-curso"
                  label="Nome do Curso"
                  placeholder="Digite o nome do curso"
                  disabled={isLoading}
                  className="w-full"
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0 p-1">
                <Switch
                  id="switch-status"
                  checked={field.value}
                  disabled={isLoading}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="switch-status" className="text-sm font-medium">
                  Curso ativo
                </Label>
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

FormCurso.displayName = "FormCurso";

export default FormCurso;
