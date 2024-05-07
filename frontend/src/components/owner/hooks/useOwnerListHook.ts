import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchOwners } from "../../../services/OwnerService";
import { IPaginatedOwners } from "../../../types/owner";

const useOwnerListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllOwners", page],
      queryFn: async (): Promise<IPaginatedOwners> =>
        await fetchOwners(page),
    });

export default useOwnerListHook;
