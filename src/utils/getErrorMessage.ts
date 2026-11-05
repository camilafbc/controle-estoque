import { AxiosError } from "axios";

type ErrorResponse = {
  error?: string;
  err?: { message?: string };
  message?: string;
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    return data?.error ?? data?.err?.message ?? data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Erro inesperado!";
}
