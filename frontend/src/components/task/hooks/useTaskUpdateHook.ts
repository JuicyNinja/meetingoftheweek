import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../../services";
import { toast } from "react-toastify";

const useTaskUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            toast.success('Task updated.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllTasks']});
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

export default useTaskUpdateHook;