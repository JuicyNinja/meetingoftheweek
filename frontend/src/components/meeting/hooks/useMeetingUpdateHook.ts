import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeeting } from "../../../services/MeetingService";
import { toast } from "react-toastify";

const useMeetingUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMeeting,
        onSuccess: () => {
            toast.success('Meeting updated.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllMeetings']});
        },
        onError: (error: any) => {
            toast.error(`Error: ${error?.response?.data?.message}`, {
                hideProgressBar: true,
                autoClose: 5000,
                type: "error",
                position: "top-right",
            });
        },
    })
}

export default useMeetingUpdateHook;