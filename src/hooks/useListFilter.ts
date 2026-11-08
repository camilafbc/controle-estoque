"use client";

import { useMemo, useState } from "react";

interface UseListFilterOptions<TItem> {
  items?: TItem[];
  getSearchText: (item: TItem) => string;
}

export function useListFilter<TItem>({
  items = [],
  getSearchText,
}: UseListFilterOptions<TItem>) {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        getSearchText(item)
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch),
      ),
    [getSearchText, items, normalizedSearch],
  );

  return {
    search,
    setSearch,
    filteredItems,
    hasSearch: normalizedSearch.length > 0,
  };
}
