import { usePerkDeleteHook } from ".";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { ModalStatus } from "../../../types";

const useConfirmModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;

    const dispatch = useAppDispatch();

    const mutation = usePerkDeleteHook();

    const isOpen = modalStatus === "remove" ? true : false;

    const handleSubmit = async () => {
        await mutation.mutateAsync(currentId);
        dispatch(changeModalStatus({modalStatus: ModalStatus.CLOSE, currentId: undefined}));
    }

    return { isOpen, dispatch, handleSubmit }
}

export default useConfirmModalHook;