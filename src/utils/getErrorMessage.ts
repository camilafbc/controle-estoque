import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<any>;
  console.error("Erro capturado:", axiosError);

  return (
    axiosError.response?.data?.error ||
    axiosError.response?.data?.err?.message ||
    axiosError.response?.data?.message ||
    axiosError.message ||
    "Erro inesperado!"
  );
}
