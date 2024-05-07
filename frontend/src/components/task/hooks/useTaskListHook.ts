import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchTasks } from "../../../services";
import { IPaginatedTasks } from "../../../types";

const useTaskListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllTasks", page],
      queryFn: async (): Promise<IPaginatedTasks> =>
        await fetchTasks(page),
    });

export default useTaskListHook;
