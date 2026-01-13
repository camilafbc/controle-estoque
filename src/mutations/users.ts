import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "@/actions/users/create-user";
import { deleteUser } from "@/actions/users/delete-user";
import { updateUser } from "@/actions/users/update-user";
import { User } from "@/types/User";

export const useCreatetUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: Omit<User, "idUser">) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return mutation;
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: Partial<User>) => updateUser(user),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.idUser] });
    },
  });
  return mutation;
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return mutation;
};
