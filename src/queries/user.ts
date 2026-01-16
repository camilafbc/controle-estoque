import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCountUsers } from "@/api/dashboard";
import { getUserById, getUsers } from "@/api/users";
import { User } from "@/types/User";

export const useUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5,
  });
  return query;
};

export const useGetUser = (id: number) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    placeholderData: () => {
      const users = queryClient.getQueryData<User[]>(["users"]);
      return users?.find((user) => user.idUser === id);
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  return query;
};

export const useGetCountUsers = () => {
  const query = useQuery({
    queryKey: ["usersCount"],
    queryFn: () => getCountUsers(),
    staleTime: Infinity,
  });
  return query;
};
