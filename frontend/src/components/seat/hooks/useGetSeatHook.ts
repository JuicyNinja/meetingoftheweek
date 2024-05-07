import { useQuery } from "@tanstack/react-query"
import { getSeat } from "../../../services/GroupService"

const useGetSeatHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['getSeat', isEdit],
        queryFn: async () => await getSeat(_id),
        enabled: !!isEdit
      });
}

export default useGetSeatHook;