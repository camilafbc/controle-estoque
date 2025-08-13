import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser, insertUser, updateUser } from "@/api/users";
import { User } from "@/types/User";

export const useInsertUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: Omit<User, "idUser">) => insertUser(user),
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
