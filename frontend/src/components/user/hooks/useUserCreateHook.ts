import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../services";
import { toast } from "react-toastify";

const useUserCreateHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success('User created.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllUsers']});
            queryClient.invalidateQueries({queryKey: ['getUserTotals']});
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

export default useUserCreateHook;