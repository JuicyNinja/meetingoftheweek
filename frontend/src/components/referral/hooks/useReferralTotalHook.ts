import {
    useQuery,
  } from "@tanstack/react-query";
  import { fetchReferralTotals } from "../../../services";
  
  const useReferralTotalHook = () => useQuery({
        queryKey: ["getReferralTotals"],
        queryFn: async (): Promise<any> =>
          await fetchReferralTotals(),
      });
  
  export default useReferralTotalHook;
  