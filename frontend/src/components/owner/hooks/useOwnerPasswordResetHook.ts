import { useMutation } from "@tanstack/react-query";
import { resetPasswordUser } from "../../../services";
import { toast } from "react-toastify";

const useOwnerPasswordResetHook = () => {

    return useMutation({
        mutationFn: resetPasswordUser,
        onSuccess: () => {
            toast.success('User password is reseted to default one', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
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

export default useOwnerPasswordResetHook;