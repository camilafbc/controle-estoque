import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  FormTurmasFields,
  turmaValidationSchema,
} from "@/schemas/turma-schema";

import { MySelect } from "../MySelect";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

// const validationSchema = yup.object({
//   codigo: yup.string().required("Campo obrigatório"),
//   turno: yup.string().required("Campo obrigatório"),
//   status: yup.boolean().default(true).required(),
// });

// export type FormTurmasFields = yup.InferType<typeof validationSchema>;

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
    {
      initialValues,
      isLoading = false,
      defaultFocus = "codigoTurma",
      onSubmit,
    },
    ref,
  ) => {
    const form = useForm<FormTurmasFields>({
      resolver: yupResolver(turmaValidationSchema),
      defaultValues: { codigoTurma: "", turnoTurma: "Manhã", status: true },
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
          codigoTurma: "",
          turnoTurma: "",
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
          codigoTurma: initialValues.codigoTurma ?? "",
          turnoTurma: initialValues.turnoTurma ?? "",
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
            name="codigoTurma"
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
                  error={!!errors.codigoTurma}
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
            name="turnoTurma"
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
                  error={!!errors.turnoTurma}
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
