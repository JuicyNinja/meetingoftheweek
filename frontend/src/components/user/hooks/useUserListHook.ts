import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchUsers } from "../../../services";
import { IPaginatedUsers } from "../../../types/user";

const useUserListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllUsers", page],
      queryFn: async (): Promise<IPaginatedUsers> =>
        await fetchUsers(page),
    });

export default useUserListHook;
