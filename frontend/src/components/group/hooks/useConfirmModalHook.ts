import { useGroupDeleteHook, useGroupJoinHook} from ".";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { ModalStatus } from "../../../types";

const useConfirmModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;

    const dispatch = useAppDispatch();
    let mutation = null
    if (modalStatus == "remove") {
        mutation = useGroupDeleteHook();
    } else if (modalStatus == "join") {
        mutation = useGroupJoinHook();
    } else {
        mutation = useGroupDeleteHook();
    }

    const isOpen = modalStatus === "remove" || modalStatus === "join" ? true : false;

    const handleSubmit = async () => {
        await mutation.mutateAsync(currentId);
        dispatch(changeModalStatus({modalStatus: ModalStatus.CLOSE, currentId: undefined}));
    }

    return { isOpen, modalStatus, dispatch, handleSubmit }
}

export default useConfirmModalHook;