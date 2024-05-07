import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchReferrals } from "../../../services/ReferralService";
import { IPaginatedReferrals } from "../../../types/referral";

const useReferralListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllReferrals", page],
      queryFn: async (): Promise<IPaginatedReferrals> =>
        await fetchReferrals(page),
    });

export default useReferralListHook;
