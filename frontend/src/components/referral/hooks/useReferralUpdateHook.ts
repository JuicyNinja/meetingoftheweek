import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReferral } from "../../../services/ReferralService";
import { toast } from "react-toastify";

const useReferralUpdateHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateReferral,
        onSuccess: () => {
            toast.success('Referral updated.', {
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
    })
}

export default useReferralUpdateHook;