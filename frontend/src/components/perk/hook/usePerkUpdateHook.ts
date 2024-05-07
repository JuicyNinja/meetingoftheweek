import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePerk } from "../../../services/PerkService";
import { toast } from "react-toastify";

const usePerkUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePerk,
        onSuccess: () => {
            toast.success('Perk updated.', {
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
    })
}

export default usePerkUpdateHook;