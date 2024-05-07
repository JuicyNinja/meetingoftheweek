import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../../services/GroupService";
import { toast } from "react-toastify";

const useGroupCreateHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGroup,
        onSuccess: () => {
            toast.success('Group created.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllGroups']});
            queryClient.invalidateQueries({queryKey: ['getGroupTotals']});
        },
        onError: (error:any) => {
            toast.error(`Error: ${error?.response?.data?.message}`, {
                hideProgressBar: true,
                autoClose: 5000,
                type: "error",
                position: "top-right",
            });
        },
    })
}

export default useGroupCreateHook;