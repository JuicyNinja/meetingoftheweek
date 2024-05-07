import {
    useQuery,
  } from "@tanstack/react-query";
  import { fetchGroupMembers } from "../../../services/GroupService";
  import { IMember } from "../../../types/group";
  
  const useGroupMemberListHook = (group_id: string) => {
        const queryKey = ["getAllGroupMembers", group_id];
        return useQuery({
            queryKey,
            queryFn: async (): Promise<IMember[]> =>
            await fetchGroupMembers(group_id, 'MEMBER'),
        });
    }
  
  export default useGroupMemberListHook;
  