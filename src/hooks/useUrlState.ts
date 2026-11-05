"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState(key: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(key) ?? "";

  const setValue = useCallback(
    (nextValue: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextValue) params.set(key, nextValue);
      else params.delete(key);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [key, pathname, router, searchParams],
  );

  return [value, setValue] as const;
}

export function useTurmaParam() {
  return useUrlState("turma");
}
