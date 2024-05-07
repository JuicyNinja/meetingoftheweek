import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services";

const useUserDeleteHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success('User deleted.', {
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
    });

    return mutation;
}

export default useUserDeleteHook;