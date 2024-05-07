import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../services";
import { toast } from "react-toastify";

const useUserUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success('User updated.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllUsers']});
            queryClient.invalidateQueries({queryKey: ['getUserTotals']});
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

export default useUserUpdateHook;