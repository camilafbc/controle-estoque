import { yupResolver } from "@hookform/resolvers/yup";
import { errorToJSON } from "next/dist/server/render";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Turma } from "@/generated/prisma";

import { MySelect } from "../MySelect";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const validationSchema = yup.object({
  codigo: yup.string().required("Campo obrigatório"),
  turno: yup.string().required("Campo obrigatório"),
  status: yup.boolean().default(true).required(),
});

export type FormTurmasFields = yup.InferType<typeof validationSchema>;

interface FormTurmasProps {
  initialValues?: any;
  isLoading?: boolean;
  defaultFocus?: keyof FormTurmasFields;
  onSubmit: SubmitHandler<FormTurmasFields>;
}

export interface FormTurmasRef {
  resetForm: () => void;
  getValues: () => FormTurmasFields;
  submitForm: () => void;
}

const FormTurmas = forwardRef<FormTurmasRef, FormTurmasProps>(
  (
    { initialValues, isLoading = false, defaultFocus = "codigo", onSubmit },
    ref,
  ) => {
    const form = useForm<FormTurmasFields>({
      resolver: yupResolver(validationSchema),
      defaultValues: { codigo: "", turno: "Manhã", status: true },
    });

    const {
      control,
      setFocus,
      reset,
      getValues,
      handleSubmit,
      formState: { errors },
    } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          codigo: "",
          turno: "",
          status: true,
        });
      },
      getValues: () => getValues(),
      submitForm: () => handleSubmit(onSubmit)(),
    }));

    useEffect(() => {
      setFocus(defaultFocus);
    }, [defaultFocus, setFocus]);

    useEffect(() => {
      if (initialValues) {
        reset({
          codigo: initialValues.codigoTurma ?? "",
          turno: initialValues.turnoTurma ?? "",
          status: initialValues.status ?? true,
        });
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-4 gap-y-6 py-8 lg:grid-cols-2"
        >
          {/* Campo do Curso */}
          <FormField
            control={control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="col-span-1 p-1">
                <Input
                  {...field}
                  required
                  id="input-curso"
                  label="Código"
                  infoText="Dígitos que identificam a turma"
                  placeholder="Informe o código da turma"
                  size="lg"
                  disabled={isLoading}
                  error={!!errors.codigo}
                  className="w-full"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="turno"
            render={({ field }) => (
              <FormItem className="p-1">
                <MySelect
                  {...field}
                  label="Turno:"
                  id="select-option"
                  placeholder="Selecione uma opção"
                  size="lg"
                  required={true}
                  options={[
                    { label: "Manhã", value: "Manhã" },
                    { label: "Tarde", value: "Tarde" },
                    { label: "Noite", value: "Noite" },
                  ]}
                  error={!!errors.turno}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                />
                <FormMessage />
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
                  Turma ativa
                </Label>
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

FormTurmas.displayName = "FormTurmas";

export default FormTurmas;
