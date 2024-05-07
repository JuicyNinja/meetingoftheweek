import { useQuery } from "@tanstack/react-query"
import { getReferral } from "../../../services/ReferralService"

const useGetReferralHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getReferral(_id),
        enabled: !!isEdit
      });
}

export default useGetReferralHook;