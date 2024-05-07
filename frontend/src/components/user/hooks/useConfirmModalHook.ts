import { useUserDeleteHook, useUserPasswordResetHook, useUserUpdateHook } from ".";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { ModalStatus } from "../../../types";

const useConfirmModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;

    const dispatch = useAppDispatch();

    const deleteMutation = useUserDeleteHook();
    const updateMutation = useUserUpdateHook();
    const resetMutation = useUserPasswordResetHook();
    const isOpen = modalStatus === ModalStatus.REMOVE || modalStatus === ModalStatus.CONVERT || modalStatus === ModalStatus.RESET ? true : false;

    const handleSubmit = async () => {
        switch (modalStatus) {
            case ModalStatus.REMOVE:
                await deleteMutation.mutateAsync(currentId);
                break;
            case ModalStatus.CONVERT:
                await updateMutation.mutateAsync({updatedUser: {_id: null, roles : ["OWNER"]}, _id: currentId});
                break;
            case ModalStatus.RESET:
                await resetMutation.mutateAsync(currentId);
                break;
        }
        ;
        dispatch(changeModalStatus({modalStatus: ModalStatus.CLOSE, currentId: undefined}));
    }

    return { isOpen, dispatch, handleSubmit }
}

export default useConfirmModalHook;