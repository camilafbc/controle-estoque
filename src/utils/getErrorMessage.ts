import { AxiosError } from "axios";

export function getErrorMessage(error: any): string {
  const axiosError = error as AxiosError<any>;

  return (
    axiosError.response?.data?.error ||
    axiosError.response?.data?.err?.message ||
    axiosError.response?.data?.message ||
    axiosError.message ||
    error ||
    error.message ||
    error.data ||
    "Erro inesperado!"
  );
}
