import { getUserById, getUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  // console.log("Chamou o useTurmas");
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });
  // console.log("Resultado da Query: " + query);
  return query;
};

export const useGetUser = (id: number) => {
  const query = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};
