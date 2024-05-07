import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../../services"

const useGetUserHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getUser(_id),
        enabled: !!isEdit
      });
}

export default useGetUserHook;