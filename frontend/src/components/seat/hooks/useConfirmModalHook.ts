import { useSeatDeleteHook} from ".";
import { changeModalStatus, useAppDispatch, useAppSelector } from "../../../store";
import { ModalStatus } from "../../../types";

const useConfirmModalHook = () => {
    const modalStatus = useAppSelector(state => state.modalStatus.modalStatus);
    const currentId = useAppSelector(state => state.modalStatus.currentId) as string;

    const dispatch = useAppDispatch();
    const mutation = useSeatDeleteHook();

    const isOpen = modalStatus === ModalStatus.REMOVE ? true : false;

    const handleSubmit = async () => {
        await mutation.mutateAsync(currentId);
        dispatch(changeModalStatus({modalStatus: ModalStatus.CLOSE, currentId: undefined}));
    }

    return { isOpen, modalStatus, dispatch, handleSubmit }
}

export default useConfirmModalHook;