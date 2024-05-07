import {
    useQuery,
  } from "@tanstack/react-query";
  import { fetchGroupTotals } from "../../../services";
  
  const useGroupTotalHook = () => useQuery({
        queryKey: ["getGroupTotals"],
        queryFn: async (): Promise<any> =>
          await fetchGroupTotals(),
      });
  
  export default useGroupTotalHook;
  