import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { joinGroup} from "../../../services/GroupService";

const useGroupJoinHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: joinGroup,
        onSuccess: () => {
            toast.success('Joined to group.', {
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

export default useGroupJoinHook;