import { useQuery } from "@tanstack/react-query"
import { getPerk } from "../../../services/PerkService"

const useGetPerkHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getPerk(_id),
        enabled: !!isEdit
      });
}

export default useGetPerkHook;