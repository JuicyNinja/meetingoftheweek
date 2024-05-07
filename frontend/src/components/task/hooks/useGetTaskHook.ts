import { useQuery } from "@tanstack/react-query"
import { getTask } from "../../../services"

const useGetTaskHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getTask(_id),
        enabled: !!isEdit
      });
}

export default useGetTaskHook;