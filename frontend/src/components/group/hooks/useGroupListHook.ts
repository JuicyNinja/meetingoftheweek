import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchGroups } from "../../../services/GroupService";
import { IPaginatedGroups } from "../../../types/group";

const useGroupListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllGroups", page],
      queryFn: async (): Promise<IPaginatedGroups> =>
        await fetchGroups(page),
    });

export default useGroupListHook;
