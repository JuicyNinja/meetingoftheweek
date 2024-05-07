import Modal from "react-modal";
import useConfirmModalHook from "./hooks/useConfirmModalHook";
import { changeModalStatus } from "../../store";
import { ModalStatus } from "../../types";
import { TrushbinIcon } from "../common";
import OutsideClickHandler from "react-outside-click-handler";

interface ConfirmModalProps {
  index: string; // Corrected interface definition
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ index }) => { // Destructure props
  const { isOpen, dispatch, handleSubmit } = useConfirmModalHook();

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Referral Modal"
      ariaHideApp={false}
      className="relative modal-container dark:bg-gray-800"
      overlayClassName="modal-overlay"
    >
      <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      >
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <TrushbinIcon />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this {index}?
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  changeModalStatus({
                    modalStatus: ModalStatus.CLOSE,
                    currentId: undefined,
                  })
                )
              }
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default ConfirmModal;
