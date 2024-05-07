import {
  useQuery,
} from "@tanstack/react-query";
import { fetchPerks } from "../../../services/PerkService";
import { IPerk } from "../../../types/perk";

const usePerkListHook = (userId: string = "") => {
  if (userId === null || userId === "") return {data: []};
  const queryKey = ["getAllPerks", userId];
  return useQuery({
      queryKey,
      queryFn: async (): Promise<IPerk[]> =>
        await fetchPerks(userId),
    });
  }
export default usePerkListHook;
