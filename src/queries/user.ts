import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCountUsers } from "@/api/dashboard";
import { getUserById, getUsers } from "@/api/users";
import { User } from "@/types/User";

export const useUsers = () => {
  // console.log("Chamou o useTurmas");
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: Infinity,
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
      console.log("Placeholder data for user:", users);
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
