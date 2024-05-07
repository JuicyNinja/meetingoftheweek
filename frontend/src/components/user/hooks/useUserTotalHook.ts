import {
    useQuery,
  } from "@tanstack/react-query";
  import { fetchUserTotals } from "../../../services";
  
  const useUserTotalHook = () => useQuery({
        queryKey: ["getUserTotals"],
        queryFn: async (): Promise<any> =>
          await fetchUserTotals(),
      });
  
  export default useUserTotalHook;
  