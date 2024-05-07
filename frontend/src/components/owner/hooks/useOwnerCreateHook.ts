import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOwner } from "../../../services/OwnerService";
import { toast } from "react-toastify";

const useOwnerCreateHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOwner,
        onSuccess: () => {
            toast.success('Owner created.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllOwners']});
            queryClient.invalidateQueries({queryKey: ['getOwnerTotals']});
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

export default useOwnerCreateHook;