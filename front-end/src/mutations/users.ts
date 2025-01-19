import { deleteUser, insertUser, updateUser } from "@/api/users";
import { UpdateUser, User } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    mutationFn: (user: UpdateUser) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
