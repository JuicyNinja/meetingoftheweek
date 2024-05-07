import { useQuery } from "@tanstack/react-query"
import { getMeeting } from "../../../services/MeetingService"

const useGetMeetingHook = (_id: string, isEdit: boolean) =>  {
    return useQuery({
        queryKey: ['projects', isEdit],
        queryFn: async () => await getMeeting(_id),
        enabled: !!isEdit
      });
}

export default useGetMeetingHook;