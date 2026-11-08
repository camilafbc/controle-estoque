"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getErrorMessage } from "@/utils/getErrorMessage";
import { getErrorMessageFromAction } from "@/utils/getErrorMessageFromAction";

export type ActionResult = {
  error?: string;
  message?: string;
  messages?: string[];
};

type UseActionMutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn" | "onSuccess" | "onError"
> & {
  action: (variables: TVariables) => Promise<TData>;
  successMessage?: string;
  onSuccess?: (data: TData) => void;
};

export function useActionMutation<
  TData extends ActionResult,
  TVariables = void,
>({
  action,
  successMessage,
  onSuccess,
  ...options
}: UseActionMutationOptions<TData, TVariables>) {
  return useMutation({
    ...options,
    mutationFn: action,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(getErrorMessageFromAction(data));
        return;
      }
      const message = successMessage ?? data.message;
      if (message) toast.success(message);
      onSuccess?.(data);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
