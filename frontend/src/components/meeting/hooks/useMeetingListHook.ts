import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchMeetings } from "../../../services/MeetingService";
import { IPaginatedMeetings } from "../../../types/meeting";

const useMeetingListHook = (page: number = 1) => useSuspenseQuery({
      queryKey: ["getAllMeetings", page],
      queryFn: async (): Promise<IPaginatedMeetings> =>
        await fetchMeetings(page),
    });

export default useMeetingListHook;
