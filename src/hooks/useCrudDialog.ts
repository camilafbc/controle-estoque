"use client";

import { useCallback, useState } from "react";

interface CrudDialogState<TId> {
  isOpen: boolean;
  editingId: TId | null;
  openForCreate: () => void;
  openForEdit: (id: TId) => void;
  close: () => void;
}

export function useCrudDialog<TId>(): CrudDialogState<TId> {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<TId | null>(null);

  const openForCreate = useCallback(() => {
    setEditingId(null);
    setIsOpen(true);
  }, []);

  const openForEdit = useCallback((id: TId) => {
    setEditingId(id);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, editingId, openForCreate, openForEdit, close };
}
