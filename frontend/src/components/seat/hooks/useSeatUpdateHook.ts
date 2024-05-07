import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeat } from "../../../services/GroupService";
import { toast } from "react-toastify";

const useSeatUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSeat,
        onSuccess: () => {
            toast.success('Seat updated.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllSeatList']});
            queryClient.invalidateQueries({queryKey: ['getGroup']});
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

export default useSeatUpdateHook;