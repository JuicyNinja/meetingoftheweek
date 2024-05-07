import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOwner } from "../../../services/OwnerService";
import { toast } from "react-toastify";

const useOwnerUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOwner,
        onSuccess: () => {
            toast.success('Owner updated.', {
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
    })
}

export default useOwnerUpdateHook;