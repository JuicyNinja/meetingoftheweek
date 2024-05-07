import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteGroup } from "../../../services/GroupService";

const useGroupDeleteHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteGroup,
        onSuccess: () => {
            toast.success('Group deleted.', {
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
    });

    return mutation;
}

export default useGroupDeleteHook;