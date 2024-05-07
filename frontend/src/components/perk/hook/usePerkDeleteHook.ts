import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deletePerk } from "../../../services/PerkService";

const usePerkDeleteHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deletePerk,
        onSuccess: () => {
            toast.success('Perk deleted.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllPerks']});
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

export default usePerkDeleteHook;