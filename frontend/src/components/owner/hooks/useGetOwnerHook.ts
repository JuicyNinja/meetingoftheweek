import { useQuery } from "@tanstack/react-query"
import { getOwner } from "../../../services/OwnerService"

const useGetOwnerHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getOwner(_id),
        enabled: !!isEdit
      });
}

export default useGetOwnerHook;