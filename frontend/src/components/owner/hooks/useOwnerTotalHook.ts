import {
    useQuery,
  } from "@tanstack/react-query";
  import { fetchOwnerTotals } from "../../../services";
  
  const useOwnerTotalHook = () => useQuery({
        queryKey: ["getOwnerTotals"],
        queryFn: async (): Promise<any> =>
          await fetchOwnerTotals(),
      });
  
  export default useOwnerTotalHook;
  