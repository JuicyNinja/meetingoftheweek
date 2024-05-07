import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPerk } from "../../../services/PerkService";
import { toast } from "react-toastify";

const usePerkCreateHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPerk,
        onSuccess: () => {
            toast.success('Perk created.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllPerks']});
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

export default usePerkCreateHook;