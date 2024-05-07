import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "../../../services/GroupService";
import { toast } from "react-toastify";

const useGroupUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateGroup,
        onSuccess: () => {
            toast.success('Group updated.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllGroups']});
            queryClient.invalidateQueries({queryKey: ['getGroupTotals']});
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

export default useGroupUpdateHook;