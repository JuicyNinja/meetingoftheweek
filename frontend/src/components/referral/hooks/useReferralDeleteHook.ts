import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteReferral } from "../../../services/ReferralService";

const useReferralDeleteHook = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteReferral,
        onSuccess: () => {
            toast.success('Referral deleted.', {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
            });
            queryClient.invalidateQueries({queryKey: ['getAllReferrals']});
            queryClient.invalidateQueries({queryKey: ['getReferralTotals']});
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

export default useReferralDeleteHook;