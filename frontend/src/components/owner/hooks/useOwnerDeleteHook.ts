import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteOwner } from "../../../services/OwnerService";

const useOwnerDeleteHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteOwner,
        onSuccess: () => {
            toast.success('Owner deleted.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllOwners']});
            queryClient.invalidateQueries({queryKey: ['getOwnerTotals']});
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

export default useOwnerDeleteHook;